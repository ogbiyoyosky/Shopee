'use strict'
const StoreProduct = use("App/Models/StoreProduct")
const ProductVariant = use("App/Models/ProductVariant")
const {
  uploadImage
} = use("App/HelperFunctions/UploadImage")
const Image = use("App/Models/Image")

class EditVariantFeature {
  constructor(request, response, auth) {
    this.request = request
    this.response = response
    this.auth = auth
  }

  async editVariant(productId, variantId) {
    const {
      variant_name,
      sku,
      color,
      size,
      price_addon,
    } = this.request.all()

    const variantImage = this.request.file('variant_image', {
      types: ['image']
    })

    const product = await StoreProduct.findBy("id", productId)

    if (!product) {
      if (!product) {
        return this.response.status(400).send({
          status: 'fail',
          status_code: 400,
          message: 'You cant add a variant, the product does not exist'
        })
      }
    }
    const mutipleImage = variantImage._files
    const productVariant = await ProductVariant.findBy("id", variantId)

    productVariant.merge({
      product_variant_name: variant_name,
      sku,
      price_addon,
      color,
      size
    })
    await productVariant.save()


    const imagesIds = []

    if (variantImage) {

      if (!mutipleImage) {
        const uploadedImage = await uploadImage(variantImage)
        const newImage = new Image()
        newImage.image_url = uploadedImage.url
        await newImage.save()
        imagesIds.push(newImage.id)

      } else {
        for (var image in mutipleImage) {
          const uploadedImage = await uploadImage(mutipleImage[image])
          const newImage = new Image()
          newImage.image_url = uploadedImage.url
          await newImage.save()
          imagesIds.push(newImage.id)
        }

      }

    }

    await productVariant.product_variant_images().sync(imagesIds)

    return this.response.status(200).send({
      message: "Variant successfully edited",
      status_code: 200,
      status: 'Success'
    })

  }


}
module.exports = EditVariantFeature
