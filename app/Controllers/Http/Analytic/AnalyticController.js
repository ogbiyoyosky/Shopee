"use strict";
const User = use("App/Models/User");
const Store = use("App/Models/Store");
const StoreProduct = use("App/Models/StoreProduct");
const OrderNotification = use("App/Models/OrderNotification");
const Order = use("App/Models/Order");

class AnalyticController {
  async fetchAnalytics({ response }) {
    return response.status(200).send({
      message: "Successfully returned analytical data",
      status_code: 200,
      status: "success",
      results: [
        {
          productsCount: 0,
          newOrdersCount: 0,
          messagesCount: 2,
          earnings: 0
        }
      ]
    });
  }
}

module.exports = AnalyticController;
