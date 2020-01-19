'use strict'

class AddVariant {
  get rules () {
    return {
      variant_image: 'required',
      variant_name: 'required|string',
      sku: 'string',
      price_valuation_degree: "required|integer",
      variant_id: "required|integer",
      
    }
  }

  get messages () {
    return {
			'variant_image.required': 'Please upload an image of the product',
      'variant_name.unique': 'Please set the product name',
      'price_valuation_degree.required': 'Please set a price valuation degree in negative or positive range.',
      'variant_id.required': 'Please choose a variant type e.g color, size ',
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

module.exports = AddVariant
