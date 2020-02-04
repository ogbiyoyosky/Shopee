'use strict'
const StoreProduct = use("App/Models/StoreProduct")
const VariantValue = use("App/Models/VariantValue")
const ProductVariant = use("App/Models/ProductVariant")
const ProductDetail = use("App/Models/ProductDetail")
const {
  uploadImage
} = use("App/HelperFunctions/UploadImage")
const Image = use("App/Models/Image")


class AddVariantToProductFeature {
  constructor(request, response, auth) {
    this.request = request
    this.response = response
    this.auth = auth
  }

  async addVariant(product_id) {
    try {
      const {
        variant_name,
        variant_id,
        variant_value,
        features,
        sku,
        price_valuation_degree,
      } = this.request.all()
      const product = await StoreProduct.findBy("id", product_id)
      const variant_image = this.request.file('variant_image', {
        types: ['image']
      })

      if (!product) {
        return this.response.status(400).send({
          status: 'fail',
          status_code: 400,
          message: 'You cant add a variant, the product does not exist'
        })
      }
      for (var i in features) {
        const variantName = await Variant.findBy('variant', features[i].name)
        const variantValue = new VariantValue()
        variantValue.variant_id = variantName.id
        variantValue.value = features[i].value
        await variantValue.save()

      }

      const mutiple_image = variant_image._files

      const productVariant = new ProductVariant()
      productVariant.product_id = product_id
      productVariant.product_variant_name = variant_name
      productVariant.sku = sku
      productVariant.price_on_variant = price_valuation_degree
      await productVariant.save()


      const productDetail = new ProductDetail()
      productDetail.product_variant_id = productVariant.id
      productDetail.product_id = product_id
      productDetail.price = parseInt(product.price) + parseInt(price_valuation_degree)
      productDetail.variant_value_id = variantValue.id
      await productDetail.save()

      const imagesIds = []

      if (variant_image) {

        if (mutiple_image == undefined) {
          const uploaded_image = await uploadImage(variant_image)
          const newImage = new Image()
          newImage.image_url = uploaded_image.url
          await newImage.save()
          imagesIds.push(newImage.id)

        } else {
          for (var i in mutiple_image) {
            const uploaded_image = await uploadImage(mutiple_image[i])
            const newImage = new Image()
            newImage.image_url = uploaded_image.url
            await newImage.save()
            imagesIds.push(newImage.id)
          }

        }

      }

      await productVariant.product_variant_images().attach(imagesIds, (row) => {
        row.main_product_id = product_id
      })

      return this.response.status(200).send({
        message: "Variant successfully added to product",
        status_code: 200,
        status: 'Success'
      })




    } catch (addVariantError) {
      console.log("addVariantError", addVariantError)
      return this.response.status(500).send({
        status: 'fail',
        status_code: 500,
        message: 'Internal Server Error'
      })
    }
  }


}
module.exports = AddVariantToProductFeature
