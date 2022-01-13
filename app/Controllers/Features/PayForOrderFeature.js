'use strict';
const Database = use('Database');
const Order = use('App/Models/Order');
const Store = use('App/Models/Store');
const OrderNotification = use('App/Models/OrderNotification');
const moment = require('moment');
const Wallet = use('App/Models/Wallet');
const StoreProduct = use('App/Models/StoreProduct');
const User = use('App/Models/User');
const Role = use('App/Models/Role');
const Event = use('Event');
const ManageWalletCashflow = use('App/HelperFunctions/ManageWalletCashflow');

class PayForOrderFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async payForOrder() {
    const trx = await Database.beginTransaction();

    try {
      const { order_id } = this.request.all();
      const { id } = this.auth.current.user;

      const order = await Order.findBy('id', order_id);

      if (!order) {
        return this.response.status(400).send({
          message: 'Order does not exist',
          status_code: 400,
          status: 'fail',
        });
      }

      if (!order.shipping_cost === null) {
        return this.response.status(400).send({
          message: 'No shipping fee added for this order.',
          status_code: 400,
          status: 'fail',
        });
      }

      if (order) {
        if (order.is_paid_at) {
          return this.response.status(400).send({
            message: 'Order already paid by you.',
            status_code: 400,
            status: 'fail',
          });
        }
        const { shipping_cost, vat, service_charge } = order;

        const amountToBeBilled =
          order.amount + shipping_cost + vat + service_charge;

        const userWallet = await Wallet.findBy('user_id', id);
        if (userWallet.balance < amountToBeBilled) {
          return this.response.status(400).send({
            message: 'Insufficient balance',
            status_code: 400,
            status: 'fail',
          });
        }

        await ManageWalletCashflow.debit({
          wallet_id: userWallet.id,
          amount: amountToBeBilled,
          description: `Payment for order ${order.placement_code}`,
        }, { transaction: trx });

        order.placement_code = 'F' + order.placement_code; //Marked as paid
        order.is_paid_at = moment().format('YYYY-MM-DD HH:mm:ss');
        await order.save();

        //shop details

        const notification = await OrderNotification.findBy(
          'order_id',
          order_id
        );

        //credit seller
        const sellerId = notification.seller_id;
        const user = await User.findBy('id', sellerId);
        const sellerWallet = await Wallet.findBy('user_id', user.id);

        await ManageWalletCashflow.credit({
          wallet_id: sellerWallet.id,
          amount: order.amount + shipping_cost,
          description: `Payment for order ${order.placement_code}`,
        }, { transaction: trx });

        const store = await Store.findBy('user_id', sellerId);

        const orderDetails = await Order.query()
          .where('id', order_id)
          .with('order_notification', (builder) => {
            builder.with('buyer_details.profile');
            builder.with('seller_details.profile');
            builder.with('order_address.country_code');
            builder.with('order_address.state');
            builder.with('order_address.province');
            builder.with('order_items');
            builder.with('order_items.main_product_images');
          })
          .first();

        const serializedOrderDetails = orderDetails.toJSON();

        console.log(serializedOrderDetails);

        // update the stock of each item in the order
        await Promise.all(serializedOrderDetails.order_notification.order_items.map(async item => {
          const product = await StoreProduct.findBy('id', item.product_id);
          product.stock = product.stock - item.qty;
          product.useTransaction(trx);
          await product.save();
        }));

        const mailDetails = {
          shop: {
            shop_name: store.store_name,
          },

          user: {
            first_name:
              serializedOrderDetails.order_notification.buyer_details.profile
                .first_name,
            last_name:
              serializedOrderDetails.order_notification.buyer_details.profile
                .last_name,
            email:
              serializedOrderDetails.order_notification.buyer_details.email,
          },

          date: moment(serializedOrderDetails.is_paid_at).format(
            'MMMM Do YYYY'
          ),

          order_details: serializedOrderDetails,

          sub_total: order.amount,

          shipping_fee: shipping_cost,

          vat: vat,

          service_charge: service_charge,

          total: amountToBeBilled,
        };

        Event.fire('new::order', mailDetails);

        trx.commit();

        return this.response.status(200).send({
          message: `Successfully paid for order  ${order.placement_code}`,
          status_code: 200,
          status: 'success',
        });
      }

      //send email
    } catch (payForOrderError) {
      console.log('payForOrderError', payForOrderError);
      trx.rollback();
      return this.response.status(500).send({
        status: 'Fail',
        message: 'Internal Server Error',
        status_code: 500,
      });
    }
  }
}
module.exports = PayForOrderFeature;
