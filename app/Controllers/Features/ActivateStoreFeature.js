"use strict";
const Store = use("App/Models/Store");
const moment = require("moment");

class ActivateStoreFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async activateStore(store_id) {
    try {
      const { is_active } = this.request.all();

      const store = await Store.findBy("id", store_id);
      const user_id = this.auth.current.user.id;
      let active_status = is_active == 1 ? "activated" : "deactivated";
      if (!store)
        return this.response.status(400).send({
          message: "Store doesnot exist",
          status_code: 400,
          status: "Fail"
        });

      if (is_active == 1) {
        store.is_activated_at = moment().format("YYYY-MM-DD  HH:mm:ss");
        store.is_deactivated_at = null;
        store.is_activated_by = user_id;
      } else {
        store.is_deactivated_at = moment().format("YYYY-MM-DD  HH:mm:ss");
        store.is_activated_at = null;
        store.is_deactivated_by = user_id;
      }
      await store.save();

      return this.response.status(200).send({
        message: `Store ${active_status} successfully`,
        status_code: 200,
        status: "Success"
      });
    } catch (ActivateStoreError) {
      console.log("ActivateStoreError", ActivateStoreError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500
      });
    }
  }
}
module.exports = ActivateStoreFeature;
