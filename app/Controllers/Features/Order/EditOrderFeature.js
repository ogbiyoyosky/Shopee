"use strict";
const Order = use("App/Models/Order");
const Role = use("App/Models/Role");
const User = use("App/Models/User");
const Wallet = use("App/Models/Wallet");
const OrderNotification = use("App/Models/OrderNotification");
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
      const superAdminRole = await Role.findBy("role_label", "Super Admin");
      const orderDetail = await Order.findBy("id", orderId);

      if (!orderDetail) {
        return this.response.status(400).send({
          message: "Order does not exist",
          status: "fail",
          status_code: 400,
        });
      }

      if (role_label === "Shop Admin") {
        if (
          is_accepted === 0 &&
          orderDetail.is_paid_at &&
          orderDetail.delivered_at === null
        ) {
          //find the buyer
          //find the seller

          const totalAmountToRefunded =
            orderDetail.vat +
            orderDetail.service_charge +
            orderDetail.amount +
            orderDetail.shipping_cost;

          const { buyer_id } = await OrderNotification.findBy(
            "order_id",
            orderId
          );

          const superAdmin = await User.findBy("role_id", superAdminRole.id);
          const superAdminWallet = await Wallet.findBy(
            "user_id",
            superAdmin.id
          );
          superAdminWallet.balance -= totalAmountToRefunded;
          await superAdminWallet.save();

          const buyerWallet = await Wallet.findBy("user_id", buyer_id);
          buyerWallet.balance += totalAmountToRefunded;
          await superAdminWallet.save();
          orderDetail.declined_at = moment().format("YYYY-MM-DD HH:mm:ss");
        }

        if (is_accepted === 0 && orderDetail.is_paid_at === null) {
          orderDetail.declined_at = moment().format("YYYY-MM-DD HH:mm:ss");
        }
        await orderDetail.save();
      }

      if (role_label === "Super Admin") {
        if (
          is_accepted === 0 &&
          orderDetail.is_paid_at &&
          orderDetail.delivered_at === null
        ) {
          //find the buyer
          //find the seller

          const totalAmountToRefunded =
            orderDetail.vat +
            orderDetail.service_charge +
            orderDetail.amount +
            orderDetail.shipping_cost;

          const { buyer_id } = await OrderNotification.findBy(
            "order_id",
            orderId
          );

          const superAdmin = await User.findBy("role_id", superAdminRole.id);
          const superAdminWallet = await Wallet.findBy(
            "user_id",
            superAdmin.id
          );
          superAdminWallet.balance -= totalAmountToRefunded;
          await superAdminWallet.save();

          const buyerWallet = await Wallet.findBy("user_id", buyer_id);
          buyerWallet.balance += totalAmountToRefunded;
          await buyerWallet.save();
          orderDetail.declined_at = moment().format("YYYY-MM-DD HH:mm:ss");
        }

        if (is_accepted === 0 && orderDetail.is_paid_at === null) {
          orderDetail.declined_at = moment().format("YYYY-MM-DD HH:mm:ss");
        }
        await orderDetail.save();
      }

      if (role_label === "Customer") {
        if (is_accepted) {
          orderDetail.buyer_accepted_at = moment().format(
            "YYYY-MM-DD HH:mm:ss"
          );
        } else {
          orderDetail.declined_at = moment().format("YYYY-MM-DD HH:mm:ss");
        }

        await orderDetail.save();
      }

      const status = is_accepted ? "Approved" : "Declined";
      const recipient = role_label === "Shop Admin" ? "Buyer" : "Seller";
      const message = `successfully ${status} the order a notification has been sent to the ${recipient} `;
      return this.response.status(200).send({
        message,
        status: "success",
        status_code: 200,
      });
    } catch (editOrderError) {
      console.log("editOrderError", editOrderError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500,
      });
    }
  }
}
module.exports = OrderEditOrderFeature;
