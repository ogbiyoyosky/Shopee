"use strict";
const Order = use("App/Models/Order");
const Profile = use("App/Models/Profile");
const User = use("App/Models/User");
const moment = require("moment");
const Event = use("Event");

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

      const userDetails = await Profile.findBy("id", orderDetail.user_id);
      const user = await User.findBy("id", orderDetail.user_id);

      const mailDetails = {
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        email: user.email,
        shipping: shipping_cost,
        vat: orderDetail.vat,
        placement_code: orderDetail.placement_code,
        amount: orderDetail.amount,
        total: shipping_cost + orderDetail.vat + orderDetail.amount,
      };

      Event.fire("new:total_invoice", mailDetails);

      return this.response.status(200).send({
        message: "Successfully added a shipping fee.",
        status: "success",
        status_code: 200,
      });
    } catch (addShippigCostError) {
      console.log("addShippigCostError", addShippigCostError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500,
      });
    }
  }
}
module.exports = OrderAddShippingCostOnOrderFeature;
