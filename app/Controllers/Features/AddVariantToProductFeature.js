'use strict'
const StoreProduct = use("App/Models/StoreProduct")
const ProductVariant = use("App/Models/ProductVariant")

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

  async createVariantImage(variantImage) {
    const uploadedImage = await uploadImage(variantImage)

    const newImage = new Image()
    newImage.image_url = uploadedImage.url
    await newImage.save()

    return newImage.id
  }

  async addVariant(productId) {
    try {
      const {
        variant_name,
        sku,
        size,
        price_addon,
      } = this.request.all()
      const product = await StoreProduct.findBy('id', productId)

      if (!product) {
        return this.response.status(400).send({
          status: 'fail',
          status_code: 400,
          message: 'You cant add a variant, the product does not exist'
        })
      }

      const variantImage = this.request.file('variant_image', {
        types: ['image']
      })
      const multipleImages = variantImage._files
      const productVariant = new ProductVariant()

      productVariant.product_id = productId
      productVariant.product_variant_name = variant_name
      productVariant.sku = sku
      productVariant.price_addon = price_addon
      productVariant.size = size

      await productVariant.save()

      const imageIds = []

      if (variantImage) {
        let imageId;

        if (!multipleImages) {
          imageId = await this.createVariantImage(variantImage)
          imageIds.push(imageId)
        } else {
          for (var image in multipleImages) {
            imageId = await this.createVariantImage(multipleImages[image])
            imageIds.push(imageId)
          }
        }
      }

      await productVariant
        .product_variant_images()
        .attach(imageIds)

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
