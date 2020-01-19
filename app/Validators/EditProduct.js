'use strict'

class EditProduct {
  get rules () {
    return {
      product_image: 'required',
      product_name: 'string',
      description: 'string',
      total_stock: "integer",
      category_id: "integer",
      sub_category_id: "integer",
      short_description: "string",
      is_published: "integer",
      price: "number",
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

module.exports = EditProduct
