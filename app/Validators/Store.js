'use strict'

class Store {
  get rules () {
    return {
      store_name: 'required|unique:stores,store_name',
      country_id: 'required|integer',
      state_id: 'required|integer',
      province_id: "required|integer",
      sell_outside_state: "required|integer",
      sell_outside_province: "required|integer"
    }
  }

  get messages () {
    return {
			'store_name.required': 'Please set a name for your store',
      'store_name.unique': 'A store with that name currently exist in the system',
      'country.required': 'Please choose the country where the store is located.',
      'state_id.required': 'Please choose the state where the store is located',
      'province_id.required': 'Please choose the province where the store is located ',
      'sell_outside_state.required': 'Please choose if you want to sell outside your state',
      'sell_outside_province.required': 'Please choose if you want to sell outside your province'
    }
  }
  
  async fails (errorMessages) { 
    return this.ctx.response.status(400).json({
      status: "invalid",
      message: "Invalid data",
      status_code: 400,
      errorMessages: errorMessages[0].message
    })
  }
}

module.exports = Store