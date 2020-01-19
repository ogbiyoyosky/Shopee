'use strict'

class EditVariant {
  get rules () {
    return {
      variant_image: 'required',
      variant_name: 'string',
      sku: 'string',
      price_valuation_degree: "integer",
      variant_id: "integer",
      
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

module.exports = EditVariant
