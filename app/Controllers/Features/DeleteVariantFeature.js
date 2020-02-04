'use strict'
const ProductDetail = use("App/Models/ProductDetail")
const StoreProduct = use("App/Models/StoreProduct")
const moment = require("moment")

class DeleteVariantFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async deleteVariant(product_id, variant_id) {
        try {
            const store_product = await StoreProduct.findBy('id',product_id)

            if(store_product) {
                     const product_variant = await ProductDetail.findBy('id', variant_id)
                     product_variant.is_deleted_at = moment().format('YYYY-MM-DD HH:mm:ss')
                     await product_variant.save()
                
                return this.response.status(200).send({
                    message: "Variant successfully deleted",
                    status_code: 200,
                    status: 'Success',
                  })
            }

            return this.response.status(400).send({
                message: "Product does not exist",
                status_code: 400,
                status: 'fail',
              })
        } catch (deleteVariantError) {
            console.log('deleteVariantError -> ', deleteVariantError);
            return this.response.status(500).send({
              status: 'fail',
              status_code: 500,
              message: 'Internal Server Error'
            })
        }
    }

  
}
module.exports = DeleteVariantFeature