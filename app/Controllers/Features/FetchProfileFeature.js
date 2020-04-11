"use strict";
const User = use("App/Models/User");
const moment = require("moment")

class FetchProfileFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async fetchProfile() {
    try {
      const user_id = this.auth.current.user.id;
      const profile = await User.query()
        .select(
          "users.id",
          "email",
          "phone_number",
          "users.is_activated_at",
          "country_codes.dial_code",
          "users.phone_number ",
          "role_label",
          "first_name",
          "last_name",
          "states.state_label",
          "states.id as state_id",
          "provinces.id as province_id",
          "country_codes.id as country_id",
          "provinces.province_label",
          "country_codes.name as country",
          "gender",
          "stores.id as store_id",
          "balance as wallet_balance"
        )
        .where("users.id", user_id)
        .innerJoin("roles", "users.role_id", "roles.id")
        .innerJoin("wallets", "users.id", "wallets.user_id")
        .innerJoin("profiles", "users.id", "profiles.user_id")
        .innerJoin("country_codes", "profiles.country_id", "country_codes.id")
        .innerJoin("states", "profiles.state_id", "states.id")
        .innerJoin("provinces", "profiles.province_id", "provinces.id")
        .innerJoin("stores", "users.id", "stores.user_id")
        .fetch();

      const serializedResult = profile.toJSON();

      const user = await User.findBy("id", user_id)
      user.last_login_time = moment().format("YYYY-MM-DD  HH:mm:ss")
      await user.save()

      return this.response.status(200).send({
        message: "Successfully fetched the users profile",
        status_code: 200,
        status: "success",
        result: serializedResult
      });
    } catch (error) {
      console.log("profile Error -> ", error);
      return this.response.status(500).send({
        status: "fail",
        status_code: 500,
        message: "Internal Server Error"
      });
    }
  }
}
module.exports = FetchProfileFeature;
