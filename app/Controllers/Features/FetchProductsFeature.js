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
          .andWhere("stock", ">", 0)
          .with("main_product_images")
          .with("category")
          .with("sub_category")
          .with("tags")
          .with("colors")
          .with("sizes")
          .with("store")
          .paginate(page, limit);
      } else if (store_id) {
        produceInStore = await StoreProduct.query()
          .whereNull("deleted_at")
          .andWhere("is_enabled", 1)
          .andWhere("store_id", store_id)
          .andWhere("stock", ">", 0)
          .with("main_product_images")
          .with("category")
          .with("sub_category")
          .with("colors")
          .with("sizes")
          .with("tags")
          .with("store")
          .paginate(page, limit);
      } else if (store_id && category_id) {
        produceInStore = await StoreProduct.query()
          .whereNull("deleted_at")
          .andWhere("store_id", store_id)
          .andWhere("category_id", category_id)
          .andWhere("stock", ">", 0)
          .with("main_product_images")
          .with("category")
          .with("colors")
          .with("sizes")
          .with("sub_category")
          .with("tags")
          .with("store")
          .paginate(page, limit);
      } else {
        console.log('Fetching Normal Stuff');

        produceInStore = await StoreProduct.query()
          .whereNull("deleted_at")
          .andWhere("is_enabled", 1)
          .andWhere("stock", ">", 0)
          .with("main_product_images")
          .with("category")
          .with("sub_category")
          .with("colors")
          .with("sizes")
          .with("tags")
          .with("store")
          .paginate(page, limit);
      }

      const serializedProducts = produceInStore.toJSON();
      
      const products = serializedProducts.data.filter(product => {
        return product.store.is_activated_at && product.store.is_deactivated_at === null;
      });

      this.response.status(200).send({
        message: "Successfully fetch all products",
        status: "success",
        status_code: 200,
        results: {
          ...serializedProducts,
          data: products
        },
      });
    } catch (fetchProductError) {
      console.log("fetchProduct Error -> ", fetchProductError);
      return this.response.status(500).send({
        status: "fail",
        status_code: 500,
        message: "Internal Server Error"
      });
    }
  }
}
module.exports = FetchProductsFeature;
