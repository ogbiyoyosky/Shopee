"use strict";
const RegisterUserFeature = use("App/Controllers/Features/RegisterUserFeature");
const ConfirmAccountFeature = use(
  "App/Controllers/Features/ConfirmAccountFeature"
);
const LoginUserFeature = use("App/Controllers/Features/LoginUserFeature");
const LogoutUserFeature = use("App/Controllers/Features/LogoutUserFeature");
const GenerateTokenFeature = use(
  "App/Controllers/Features/GenerateTokenFeature"
);
const moment = require("moment");
const User = use("App/Models/User");

class AuthController {
  register({ request, response }) {
    return new RegisterUserFeature(request, response).registerUser();
  }

  confirmAccount({ request, response, params: { confirmation_token } }) {
    return new ConfirmAccountFeature(request, response).confirmUserAccount(
      confirmation_token
    );
  }

  loginUser({ request, response, auth }) {
    return new LoginUserFeature(request, response, auth).login();
  }

  logout({ request, response, auth }) {
    return new LogoutUserFeature(request, response, auth).logout();
  }

  generateToken({ request, response, auth }) {
    return new GenerateTokenFeature(request, response, auth).generateToken();
  }

  async ban({ request, response, params: { user_id } }) {
    try {
      const { is_ban } = request.all();

      if (is_ban === undefined) {
        return response.status(400).send({
          message: "set is_ban to either 1 or 0",
          status_code: 400,
          status: "fail"
        });
      }
      const user = await User.findBy("id", user_id);
      user.banned_at = is_ban ? moment().format("YYYY-MM-DD  HH:mm:ss") : null;
      await user.save();

      const message = is_ban ? "Banned" : "Activated";

      return response.status(200).send({
        message: `Successfully ${message} the user`,
        status: "success",
        status_code: 200
      });
    } catch (error) {
      console.log(error);
      return response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500
      });
    }
  }
}

module.exports = AuthController;
