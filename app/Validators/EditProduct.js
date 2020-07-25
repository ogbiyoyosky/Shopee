"use strict";

class EditProduct {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      product_name: "string",
      description: "string",
      stock: "integer",
      category_id: "integer",
      subcategory_id: "integer",
      is_published: "integer",
      price: "number",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json({
      status: "invalid",
      message: "Invalid data",
      status_code: 400,
      errorMessages: errorMessages[0].message,
    });
  }
}

module.exports = EditProduct;
