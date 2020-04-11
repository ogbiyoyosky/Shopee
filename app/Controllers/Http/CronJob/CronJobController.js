"use strict";
const User = use("App/Models/User");
const Store = use("App/Models/Store");
const StoreProduct = use("App/Models/StoreProduct");

class CronJobController {
  async removeProductAfterThirtyDays({ response }) {
    try {
      const allUser = await User.all();
      const serializedUser = allUser.toJSON();

      for (var user in serializedUser) {
        if (serializedUser[user].is_errant_seller) {
          const store = await Store.findBy("user_id", serializedUser[user].id);

          await StoreProduct.query()
            .where("store_id", store.id)
            .update({ is_enabled: 0 });

          const seller = await User.findBy("id", serializedUser[user].id);
          seller.last_login_time = null;
          await seller.save();
        }
      }

      return response.status(200).send({
        status: "succes",
        message: "Succeffully removed all in active products",
        status_code: 200,
      });
    } catch (thirtyDaysBanError) {
      console.log("thirtyDaysBanError", thirtyDaysBanError);
      return response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500,
      });
    }
  }
}

module.exports = CronJobController;
