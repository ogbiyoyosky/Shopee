"use strict";
const StoreProduct = use("App/Models/StoreProduct");

class FetchProductInStoreFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async fetchProduct(store_id) {
    try {
      const { page, limit } = this.request.get();
      const produceInStore = await StoreProduct.query()
        .whereNull("is_deleted_at")
        .andWhere("store_id", store_id)
        .with("main_product_images")
        .with("category")
        .with("sub_category")
        .with("tags")
        .with("variant", builder => {
          builder.whereNull("is_deleted_at");
          builder.with("variant_value");
          builder.with("variant_details", builder => {
            builder.with("product_variant_images");
          });
        })
        .paginate(page, limit);

      this.response.status(200).send({
        message: "Successfully fetch all products",
        status: "success",
        status_code: 200,
        results: produceInStore
      });
    } catch (fetchProduceError) {
      console.log("fetchProduceError", fetchProduceError);
      return this.response.status(500).send({
        status: "fail",
        status_code: 500,
        message: "Internal Server Error"
      });
    }
  }
}
module.exports = FetchProductInStoreFeature;
