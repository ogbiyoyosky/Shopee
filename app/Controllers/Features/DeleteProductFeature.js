"use strict";
const StoreProduct = use("App/Models/StoreProduct");
const moment = require("moment");

class DeleteProductFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }
  /**
   *
   * @param {Integer} product_id
   */
  async deleteProduct(productId) {
    try {
      const product = await StoreProduct.findBy("id", productId);

      if (product) {
        product.deleted_at = moment().format("YYYY-MM-DD HH:mm:ss");
        await product.save();

        return this.response.status(200).send({
          message: "Product successfully deleted",
          status_code: 200,
          status: "Success",
        });
      }

      return this.response.status(400).send({
        message: "Product does not exist",
        status_code: 400,
        status: "fail",
      });
    } catch (deleteProductError) {
      console.log("deleteProductError", deleteProductError);
      return this.response.status(500)({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500,
      });
    }
  }
}
module.exports = DeleteProductFeature;
