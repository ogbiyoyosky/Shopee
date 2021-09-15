'use strict';

const Event = use('Event');

const CreateOrderFeature = use(
  'App/Controllers/Features/Order/CreateOrderFeature'
);
const FetchSellerOrderNotificationFeature = use(
  'App/Controllers/Features/Notification/FetchSellerOrderNotificationFeature'
);
const FetchBuyerNotificationFeature = use(
  'App/Controllers/Features/Notification/FetchBuyerNotificationFeature'
);
const ViewOrderFeature = use('App/Controllers/Features/Order/ViewOrderFeature');
const EditOrderFeature = use('App/Controllers/Features/Order/EditOrderFeature');
const AddShippingCostOnOrderFeature = use(
  'App/Controllers/Features/Order/AddShippingCostOnOrderFeature'
);
const PayForOrderFeature = use('App/Controllers/Features/PayForOrderFeature');
const Order = use('App/Models/Order');
const moment = require('moment');

class OrderController {
  async createOrder({ request, response, auth }) {
    return new CreateOrderFeature(request, response, auth).createOrder();
  }

  async fetchSellerOrderNotifications({ request, response, auth }) {
    return new FetchSellerOrderNotificationFeature(
      request,
      response,
      auth
    ).fetchSellerOrderNotifications();
  }

  async viewOrder({ request, response, auth, params: { order_id } }) {
    return new ViewOrderFeature(request, response, auth).viewOrder(order_id);
  }

  async editOrder({ request, response, auth, params: { order_id } }) {
    return new EditOrderFeature(request, response, auth).editOrder(order_id);
  }

  async addShippingCost({ request, response, auth, params: { order_id } }) {
    return new AddShippingCostOnOrderFeature(
      request,
      response,
      auth
    ).addShippingCost(order_id);
  }

  async fetchBuyerOrderNotification({ request, response, auth }) {
    return new FetchBuyerNotificationFeature(
      request,
      response,
      auth
    ).fetchBuyerOrderNotification();
  }

  async payForOrder({ request, response, auth }) {
    return new PayForOrderFeature(request, response, auth).payForOrder();
  }

  async delivered({ response, params: { order_id } }) {
    try {
      if (!order_id) {
        return response.status(400).send({
          message: 'please provide the order ID',
          status: 'fail',
          status_code: 400,
        });
      }

      const order = await Order.query()
        .where('id', order_id)
        .with('order_notification', (builder) => {
          builder.with('buyer_details.profile');
        })
        .first();

      if (order) {
        const { placement_code, order_notification } = order.toJSON();
        console.log(order.toJSON());
        const { email } = order_notification.buyer_details.profile;

        order.delivered_at = moment().format('YYYY-MM-DD HH:mm:ss');
        await order.save();

        Event.fire('new::orderDelivered', { email, placement_code });

        return response.status(200).send({
          message: 'Order marked as delivered',
          status: 'success',
          status_code: 200,
        });
      }

      return response.status(400).send({
        message: 'Order does not exist',
        status: 'fail',
        status_code: 400,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async confirmDelivered({ response, params: { order_id } }) {
    try {
      if (!order_id) {
        return response.status(400).send({
          message: 'please provide the order ID',
          status: 'fail',
          status_code: 400,
        });
      }

      const order = await Order.query()
        .where('id', order_id)
        .with('order_notification', (builder) => {
          builder.with('buyer_details.profile');
          builder.with('seller_details.profile');
          builder.with('order_address.country_code');
          builder.with('order_address.state');
          builder.with('order_address.province');
          builder.with('order_items.main_product_images');
        })
        .first();

      if (order) {
        const serializedOrder = order.toJSON();
        const { placement_code } = serializedOrder;
        console.log(order.toJSON());

        order.buyer_confirms_delivery_at = moment().format(
          'YYYY-MM-DD HH:mm:ss'
        );
        await order.save();

        const { amount, shipping_cost, vat, service_charge } = serializedOrder;
        const totalCost = amount + shipping_cost + vat + service_charge;

        // Prepare reciept for thank you mail
        const mailDetails = {
          user: {
            first_name:
              serializedOrder.order_notification.buyer_details.profile
                .first_name,
            last_name:
              serializedOrder.order_notification.buyer_details.profile
                .last_name,
            email: serializedOrder.order_notification.buyer_details.email,
          },

          placement_code,

          date: moment(serializedOrder.is_paid_at).format('MMMM Do YYYY'),

          order_details: serializedOrder,

          sub_total: amount,

          shipping_fee: shipping_cost,

          vat: vat,

          service_charge: service_charge,

          total: totalCost,
        };

        Event.fire('new::deliveryConfirmed', {
          email: serializedOrder.order_notification.seller_details.email,
          placement_code,
        });

        Event.fire('new::orderComplete', mailDetails);

        return response.status(200).send({
          message: 'Order confirmed as delivered',
          status: 'success',
          status_code: 200,
        });
      }

      return response.status(400).send({
        message: 'Order does not exist',
        status: 'fail',
        status_code: 400,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).send({
        status: 'Fail',
        message: 'Internal Server Error',
        status_code: 500,
      });
    }
  }

  async extendTime({ response, params: { order_id } }) {
    try {
      if (!order_id) {
        return response.status(400).send({
          message: 'please provide the order ID',
          status: 'fail',
          status_code: 400,
        });
      }
      const order = await Order.findBy('id', order_id);

      if (order) {
        order.delivery_time_addon += 24;
        await order.save();

        return response.status(200).send({
          message: 'successfully extended the sellers time by 24 hours',
          status: 'success',
          status_code: 200,
        });
      }

      return response.status(400).send({
        message: 'Order does not exist',
        status: 'fail',
        status_code: 400,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).send({
        status: 'Fail',
        message: 'Internal Server Error',
        status_code: 500,
      });
    }
  }

  async processRefund({ response, params }) {
    const { order_id } = params;

    const order = await Order.query()
      .where('id', order_id)
      .with('order_notification', (builder) => {
        builder.with('buyer_details.profile');
      })
      .first();

    const { amount, placement_code, order_notification } = order.toJSON();
    console.log(order.toJSON());
    const { email } = order_notification.buyer_details.profile;

    Event.fire('new::orderRefund', {
      email,
      amount,
      placement_code
    });

    return response.status(200).send({
      message:
        'Successfully placed a request for a refund. Please wait 24h for a response.',
      status_code: 200,
      status: 'success',
      results: [],
    });
  }

  async allOrders({ response }) {
    try {
      const orderDetails = await Order.query()
        .with('order_notification', (builder) => {
          builder.with('buyer_details.profile');
          builder.with('seller_details.profile');
          builder.with('order_address.country_code');
          builder.with('order_address.state');
          builder.with('order_address.province');
          builder.with('order_items');
        })
        .fetch();

      return response.status(200).send({
        message: 'Successfully returned the order details',
        status_code: 200,
        status: 'success',
        results: orderDetails,
      });
    } catch (error) {
      console.log('allOrderError', error);
      return response.status(500).send({
        status: 'Fail',
        message: 'Internal Server Error',
        status_code: 500,
      });
    }
  }
}

module.exports = OrderController;
