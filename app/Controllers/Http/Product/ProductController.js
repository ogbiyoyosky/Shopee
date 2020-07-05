"use strict";
const FetchProductCategoriesFeature = use(
  "App/Controllers/Features/FetchProductCategoriesFeature"
);
const FetchProductsFeature = use(
  "App/Controllers/Features/FetchProductsFeature"
);
const StoreProduct = use("App/Models/StoreProduct");

class ProductController {
  async getCategories({ request, response, auth }) {
    return new FetchProductCategoriesFeature(
      request,
      response,
      auth
    ).fetchCategories();
  }

  async fetchProduct({ request, response, auth }) {
    return new FetchProductsFeature(request, response, auth).fetchProduct();
  }

  async fetchProductById({ response, params: { product_id } }) {
    try {
      const produce = await StoreProduct.query()
        .whereNull("deleted_at")
        .andWhere("id", product_id)
        .with("main_product_images")
        .with("category")
        .with("sub_category")
        .with("store")
        .with("tags")
        .first();

      const serializedProduct = produce.toJSON();

      return response.status(200).send({
        status: "succes",
        message: "Succeffully fetch the product",
        status_code: 200,
        results: serializedProduct,
      });
    } catch (fetchProductById) {
      console.log("fetchProductById", fetchProductById);
      return response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500,
      });
    }
  }
}

module.exports = ProductController;
