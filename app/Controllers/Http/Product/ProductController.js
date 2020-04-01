'use strict'
const FetchProductCategoriesFeature = use('App/Controllers/Features/FetchProductCategoriesFeature')
const FetchProductsFeature = use("App/Controllers/Features/FetchProductsFeature")

class ProductController {
  async getCategories({
    request,
    response,
    auth
  }) {
    return new FetchProductCategoriesFeature(request, response, auth).fetchCategories()
  }

  async fetchProduct({
    request,
    response,
    auth
  }) {
    return new FetchProductsFeature(request, response, auth).fetchProduct()
  }


}

module.exports = ProductController
