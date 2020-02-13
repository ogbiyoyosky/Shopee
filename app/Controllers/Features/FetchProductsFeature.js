'use strict'
const StoreProduct = use("App/Models/StoreProduct")

class FetchProductsFeature {
  constructor(request, response, auth) {
    this.request = request
    this.response = response
    this.auth = auth
  }

  async fetchProduct() {
    try {
      const {
        page,
        limit,
        category_id
      } = this.request.get();

      let produceInStore

      console.log(category_id)

      if (category_id) {
        produceInStore = await StoreProduct.query()
          .whereNull("deleted_at")
          .andWhere('category_id', category_id)
          .with("main_product_images")
          .with("category")
          .with("sub_category")
          .with("tags")
          .with("variant", builder => {
            builder.whereNull("deleted_at");
            builder.with('product_variant_images')
          })
          .paginate(page, limit);
      } else {
        console.log('here')
        produceInStore = await StoreProduct.query()
          .whereNull("deleted_at")
          .with("main_product_images")
          .with("category")
          .with("sub_category")
          .with("tags")
          .with("variant", builder => {
            builder.whereNull("deleted_at");
            builder.with('product_variant_images')
          })
          .paginate(page, limit);

      }


      this.response.status(200).send({
        message: "Successfully fetch all products",
        status: "success",
        status_code: 200,
        results: produceInStore
      });


    } catch (fetchProductError) {
      console.log('fetchProduct Error -> ', fetchProductError);
      return this.response.status(500).send({
        status: 'fail',
        status_code: 500,
        message: 'Internal Server Error'
      })
    }
  }
}
module.exports = FetchProductsFeature
