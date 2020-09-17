"use strict";
const User = use("App/Models/User");
const Profile = use("App/Models/Profile");
const PasswordReset = use("App/Models/PasswordReset");
const Event = use("Event");
const randomString = require("randomstring");
const moment = require("moment");
const Env = use("Env");
const frontend_url = Env.get("FRONTEND_URL");

class SendResetPasswordLinkFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async sendLink() {
    try {
      const { email } = this.request.all();

      const current_date = Date.now();

      const user = await User.findBy("email", email);
      if (user) {
        //there is a token that has not expired dont send a mail
        const password_reset_token = await PasswordReset.query()
          .where("user_id", user.id)
          .andWhere("expires_at", ">", current_date)
          .first();

        if (password_reset_token) {
          return this.response.status(200).send({
            status: "Success",
            message: `An email has already been sent to ${user.email} `,
            status_code: 200
          });
        } else {
          const profile = await Profile.findBy("user_id", user.id);
          const token = randomString.generate(32);
          const expires_at = moment() + 3600000;
          //  find the last password reset token and delete
          const last_token = await PasswordReset.findBy("user_id", user.id);
          if (last_token) {
            last_token.expires_at = expires_at;
            last_token.token = token;
            await last_token.save();
          } else {
            const password_reset = new PasswordReset();
            password_reset.expires_at = expires_at;
            password_reset.token = token;
            password_reset.user_id = user.id;
            await password_reset.save();
          }

          const mailDetails = {
            user,
            profile,
            token,
            frontend_url
          };

          Event.fire("new::passwordReset", mailDetails);
        }

        return this.response.status(201).send({
          status: "Success",
          message: `A reset mail has been sent to ${user.email}`,
          status_code: 201
        });
      }

      return this.response.status(400).send({
        status: "Fail",
        message: "User does not exist in the system",
        status_code: 400
      });
    } catch (registerUserError) {
      console.log("registerUserError", registerUserError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500
      });
    }
  }
}
module.exports = SendResetPasswordLinkFeature;
