"use strict";
const Order = use("App/Models/Order");
const moment = require("moment");

class OrderAddShippingCostOnOrderFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async addShippingCost(orderId) {
    try {
      const { shipping_cost } = this.request.all();
      const orderDetail = await Order.findBy("id", orderId);
      orderDetail.shipping_cost = shipping_cost;
      orderDetail.seller_accepted_at = moment().format("YYYY-MM-DD HH:mm:ss");
      await orderDetail.save();

      return this.response.status(200).send({
        message: "Successfully added a shipping fee.",
        status: "success",
        status_code: 200
      });
    } catch (addShippigCostError) {
      console.log("addShippigCostError", addShippigCostError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500
      });
    }
  }
}
module.exports = OrderAddShippingCostOnOrderFeature;
