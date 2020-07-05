"use strict";

class Store {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      store_name: "required|unique:stores,store_name",
      country_id: "required|integer",
      state_id: "required|integer",
      province_id: "required|integer",
      sell_outside_state: "required|integer",
      sell_outside_province: "required|integer",
      // store_address: "required|string",
      // store_formatted_adddress: "required|string"
    };
  }

  get messages() {
    return {
      "store_name.required": "Please set a name for your store",
      "store_name.unique":
        "A store with that name currently exist in the system",
      "country.required":
        "Please choose the country where the store is located.",
      "state_id.required": "Please choose the state where the store is located",
      "province_id.required":
        "Please choose the province where the store is located ",
      "sell_outside_state.required":
        "Please choose if you want to sell outside your state",
      "sell_outside_province.required":
        "Please choose if you want to sell outside your province",
      // 'store_address.required': 'Please enter the address of thee store location',
      // 'store_formatted_address': 'Pleease enter the formatted store address'
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

module.exports = Store;
