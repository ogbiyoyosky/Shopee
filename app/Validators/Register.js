"use strict";

class Register {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      first_name: "required|string",
      last_name: "required|string",
      phone_number: "required|string|unique:users,phone_number",
      email: "required|email|unique:users,email",
      password: "required|min:6",
      country_id: "required|integer",
      reg_type_id: "required|integer",
      state_id: "required",
      province_id: "required|integer",
      gender: "required|string",
    };
  }

  get messages() {
    return {
      "first_name.required": "First name is required",
      "last_name.required": "Last name is required",
      "phone_number.required": "Phone number is required",
      "phone_number.unique":
        "A user with similar phone number has already registered",
      "email.required": "Email is required",
      "email.email": "Please provide a valid email address",
      "email.unique": "A user with similar email has already registered",
      "password.required": "Kindly set a password",
      "password.min": "Kindly set a password above 5 characters",
      "country_id.required": "Kindly select your country",
      "state_id.required": "Kindly select your state",
      "province_id.required": "Kindly select your province",
      "gender.required": "Kindly select your gender",
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

module.exports = Register;
