"use strict";
const Order = use("App/Models/Order");
const Role = use("App/Models/Role");
const moment = require("moment");

class OrderEditOrderFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async editOrder(orderId) {
    try {
      const { is_accepted } = this.request.all();

      const { role_id } = this.auth.current.user;
      const { role_label } = await Role.findBy("id", role_id);
      const orderDetail = await Order.findBy("id", orderId);
      if (!orderDetail) {
        return this.response.status(400).send({
          message: "Order does not exist",
          status: "fail",
          status_code: 400
        });
      }

      if (role_label === "Shop Admin") {
        if (is_accepted) {
          orderDetail.seller_accepted_at = moment().format(
            "YYYY-MM-DD HH:mm:ss"
          );
        } else {
          orderDetail.declined_at = moment().format("YYYY-MM-DD HH:mm:ss");
        }

        await orderDetail.save();
      } else if (role_label === "Customer") {
        if (is_accepted) {
          orderDetail.buyer_accepted_at = moment().format(
            "YYYY-MM-DD HH:mm:ss"
          );
        } else {
          orderDetail.declined_at = moment().format("YYYY-MM-DD HH:mm:ss");
        }

        await orderDetail.save();
      } else {
        return this.response.status(400).send({
          message: "No permission granted on role",
          status: "fail",
          status_code: 400
        });
      }

      const status = is_accepted ? "Approved" : "Declined";
      const recipient = role_label === "Shop Admin" ? "Buyer" : "Seller";
      const message = `successfully ${status} the order a notification has been sent to the ${recipient} `;
      return this.response.status(200).send({
        message,
        status: "success",
        status_code: 200
      });
    } catch (editOrderError) {
      console.log("editOrderError", editOrderError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500
      });
    }
  }
}
module.exports = OrderEditOrderFeature;
