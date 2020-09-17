'use strict'
const SubCategory = use('App/Models/SubCategory')

class FetchProductCategoryFeature {
    constructor (  response ) {
        this.response = response
    }

    async fetchCategory( category_id) {
        try {
            const sub_category = await SubCategory.query()
            .select('id','sub_category_label')
            .where('category_id',category_id)
            .fetch()

            const serialized_sub_category = sub_category.toJSON()

            return this.response.status(200).send({
                message: "successfully fetched all subcategory",
                status: "success",
                status_code: 200,
                result: serialized_sub_category
            })

        } catch( fetchProductCategoryError) {
            console.log("fetchProductCategoryError", fetchProductCategoryError)
            return this.response.status(500).send({
                status: 'fail',
                status_code: 500,
                message: 'Internal Server Error'
              })
        }
    }

  
}
module.exports = FetchProductCategoryFeature