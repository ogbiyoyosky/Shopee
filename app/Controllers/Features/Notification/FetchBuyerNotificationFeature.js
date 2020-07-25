"use strict";
const Database = use("Database");
const OrderProduct = use("App/Models/OrderProduct");

class NotificationFetchBuyerNotificationFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async fetchBuyerOrderNotification() {
    try {
      const userId = this.auth.current.user.id;
      let orderNotification = await Database.from("order_notifications")
        .select(
          "orders.id as order_id",
          "seller_id",
          "orders.amount",
          "orders.declined_at",
          "orders.created_at",
          "orders.is_paid_at",
          "orders.buyer_accepted_at",
          "orders.delivered_at",
          "orders.buyer_confirms_delivery_at",
          "orders.shipping_cost",
          "orders.vat",
          "orders.service_charge"
          // "store_products.product_name",
          // "order_products.product_id"
        )
        .where("buyer_id", userId)
        .innerJoin("users", "order_notifications.buyer_id", "users.id")
        .innerJoin("orders", "order_notifications.order_id", "orders.id")
        // .innerJoin(
        //   "store_products",
        //   "order_products.product_id",
        //   "store_products.id"
        // )

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
        results: orderNotification,
      });
    } catch (fetchBuyerOrderNotificationError) {
      console.log(
        "fetchBuyerOrderNotification",
        fetchBuyerOrderNotificationError
      );
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500,
      });
    }
  }
}
module.exports = NotificationFetchBuyerNotificationFeature;
