"use strict";

class EditProfile {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      first_name: "string",
      last_name: "string",
      phone_number: "string",
      email: "email",
      password: "min:6",
      country_id: "integer",
      reg_type_id: "integer",
      state_id: "integer",
      province_id: "integer",
      gender: "string",
    };
  }

  get messages() {
    return {
      "email.email": "Please provide a valid email address",
      "password.min": "Kindly set a password above 5 characters",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json({
      status: "invalid",
      message: errorMessages[0].message,
      status_code: 400,
      errorMessages: errorMessages[0].message,
    });
  }
}

module.exports = EditProfile;
