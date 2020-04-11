"use strict";
const StoreProduct = use("App/Models/StoreProduct");

class FetchProductsFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async fetchProduct() {
    try {
      const { page, limit, category_id, store_id } = this.request.get();

      let produceInStore;

      if (category_id) {
        produceInStore = await StoreProduct.query()
          .whereNull("deleted_at")
          .andWhere("is_enabled", 1)
          .andWhere("category_id", category_id)
          .with("main_product_images")
          .with("category")
          .with("sub_category")
          .with("tags")
          .with("store")
          .paginate(page, limit);
      } else if (store_id) {
        produceInStore = await StoreProduct.query()
          .whereNull("deleted_at")
          .andWhere("is_enabled", 1)
          .andWhere("store_id", store_id)
          .with("main_product_images")
          .with("category")
          .with("sub_category")
          .with("tags")
          .with("store")
          .paginate(page, limit);
      } else if (store_id && category_id) {
        produceInStore = await StoreProduct.query()
          .whereNull("deleted_at")
          .andWhere("store_id", store_id)
          .andWhere("category_id", category_id)
          .with("main_product_images")
          .with("category")
          .with("sub_category")
          .with("tags")
          .with("store")
          .paginate(page, limit);
      } else {
        produceInStore = await StoreProduct.query()
          .whereNull("deleted_at")
          .andWhere("is_enabled", 1)
          .with("main_product_images")
          .with("category")
          .with("sub_category")
          .with("tags")
          .with("store")
          .paginate(page, limit);
      }

      this.response.status(200).send({
        message: "Successfully fetch all products",
        status: "success",
        status_code: 200,
        results: produceInStore,
      });
    } catch (fetchProductError) {
      console.log("fetchProduct Error -> ", fetchProductError);
      return this.response.status(500).send({
        status: "fail",
        status_code: 500,
        message: "Internal Server Error",
      });
    }
  }
}
module.exports = FetchProductsFeature;
