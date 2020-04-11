"use strict";
const Database = use("Database");

class NotificationFetchSellerOrderNotificationFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async fetchSellerOrderNotifications() {
    try {
      const userId = this.auth.current.user.id;
      const orderNotification = await Database.from("order_notifications")
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
          "orders.service_charge",
          "store_products.product_name",
          "order_products.product_id"
        )
        .where("seller_id", userId)
        .innerJoin("users", "order_notifications.buyer_id", "users.id")
        .innerJoin(
          "order_products",
          "order_notifications.order_id",
          "order_products.id"
        )
        .innerJoin("orders", "order_notifications.order_id", "orders.id")
        .innerJoin(
          "store_products",
          "order_products.product_id",
          "store_products.id"
        )
        .orderBy("orders.created_at", "desc");

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
