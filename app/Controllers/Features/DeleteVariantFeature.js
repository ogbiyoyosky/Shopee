'use strict'

const StoreProduct = use("App/Models/StoreProduct")
const ProductVariant = use("App/Models/ProductVariant")
const moment = require("moment")

class DeleteVariantFeature {
  constructor(request, response, auth) {
    this.request = request
    this.response = response
    this.auth = auth
  }

  async deleteVariant(productId, variantId) {
    try {
      const storeProduct = await StoreProduct.findBy('id', productId)

      if (storeProduct) {
        const productVariant = await ProductVariant.findBy('id', variantId)
        productVariant.deleted_at = moment().format('YYYY-MM-DD HH:mm:ss')
        await productVariant.save()

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
