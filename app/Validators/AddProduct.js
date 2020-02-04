'use strict'

class AddProduct {
  get rules () {
    return {
      product_image: 'required',
      product_name: 'required|string',
      description: 'required|string',
      total_stock: "required|integer",
      category_id: "required|integer",
      sub_category_id: "required|integer",
      short_description: "required|string",
      is_published: "required|integer",
      tag: "required",
      price: "required|number",
    }
  }

  get messages () {
    return {
			'product_image.required': 'Please upload an image of the product',
      'product_name.unique': 'Please set the product name',
      'description.required': 'Please set a description of the product.',
      'total_stock.required': 'Please set how many in stock.',
      'category_id.required': 'Please choose the category of the product ',
      'sub_category_id.required': 'Please choose the subcategory of the item',
      'short_description.required': 'Please add a short description',
      'is_published.required': 'Set the publishing status',
      'tag.required': 'please add at least one tag on the product',
      'price.required': 'please add a price'
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

module.exports = AddProduct
