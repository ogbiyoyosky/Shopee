"use strict";
const Database = use("Database");
const OrderProduct = use("App/Models/OrderProduct");

class NotificationFetchSellerOrderNotificationFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async fetchSellerOrderNotifications() {
    try {
      const userId = this.auth.current.user.id;
      let orderNotification = await Database.from("order_notifications")
        .select(
          "orders.id as order_id",
          "buyer_id",
          "orders.amount",
          "orders.declined_at",
          "orders.is_paid_at",
          "orders.created_at",
          "orders.buyer_accepted_at",
          "orders.delivered_at",
          "orders.buyer_confirms_delivery_at",
          "orders.shipping_cost",
          "orders.vat",
          "orders.service_charge"
        )
        .where("seller_id", userId)
        .innerJoin("users", "order_notifications.buyer_id", "users.id")

        .innerJoin("orders", "order_notifications.order_id", "orders.id")
        .orderBy("orders.created_at", "desc");

      for (var order in orderNotification) {
        const orderDetails = await OrderProduct.query()
          .where("order_id", orderNotification[order].order_id)

          .with("products")
          .fetch();
        const serializedOrderDetails = orderDetails.toJSON();

        orderNotification[order].order_products = serializedOrderDetails;

        const query = await Database.from("order_products")
          .where("order_id", orderNotification[order].order_id)
          .count();
        orderNotification[order].product_count = query[0]["count(*)"];
      }

      return this.response.status(200).send({
        message: "Successfully returned all order notifications",
        status_code: 200,
        status: "success",
        results: orderNotification
      });
    } catch (fetchSellerOrderNotificationsError) {
      console.log(
        "fetchSellerOrderNotificationsError",
        fetchSellerOrderNotificationsError
      );
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500
      });
    }
  }
}
module.exports = NotificationFetchSellerOrderNotificationFeature;
