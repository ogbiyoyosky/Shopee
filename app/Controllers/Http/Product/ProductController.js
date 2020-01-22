'use strict'
const FetchProductCategoriesFeature = use('App/Controllers/Features/FetchProductCategoriesFeature')

class ProductController {
    async getCategories ({request, response, auth}) {
        return new FetchProductCategoriesFeature(request, response, auth).fetchCategories()
    }
}

module.exports = ProductController
