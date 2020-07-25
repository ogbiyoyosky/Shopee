'use strict'
const Category = use('App/Models/Category')


class FetchProductCategoriesFeature {
  constructor(request, response, auth) {
    this.request = request
    this.response = response
    this.auth = auth
  }

  async fetchCategories() {
    try {

      const categories = await Category.query()
        .select('id', 'category_label')
        .with("sub_category")
        .fetch()

      const serialized_categories = categories.toJSON()



      return this.response.status(200).send({
        message: "Successfully fetch all Product Category",
        status_code: 200,
        status: "Success",
        result: serialized_categories
      })

    } catch (FetchProductCategoriesFeatureError) {
      console.log("FetchProductCategoriesFeatureError", FetchProductCategoriesFeatureError)
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500
      })
    }
  }


}
module.exports = FetchProductCategoriesFeature
