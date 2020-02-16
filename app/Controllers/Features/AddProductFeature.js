'use strict'
const Store = use("App/Models/Store")
const {
	uploadImage,
	uploadBase64
} = use("App/HelperFunctions/UploadImage")
const Image = use("App/Models/Image")
const ProductTag = use("App/Models/ProductTag")
const StoreProduct = use("App/Models/StoreProduct")
const ProductVariant = use("App/Models/ProductVariant")

class AddProductFeature {
	constructor(request, response, auth) {
		this.request = request
		this.response = response
		this.auth = auth
	}

	async processTags({
		tags,
		productId
	}) {
		if (tags) {
			for (var tag in tags) {
				const productTag = new ProductTag()

				productTag.product_id = productId
				productTag.tag = tags[tag]

				await productTag.save()
			}
		}
	}

	async addProduct() {
		try {
			const {
				user
			} = this.auth.current
			const userId = user.id
			const userStore = await Store.findBy('user_id', userId)
			const {
				product_name,
				variants,
				description,
				stock,
				category_id,
				subcategory_id,
				is_published,
				discount,
				tag,
				price
			} = this.request.all()

			if (!userStore.is_activated_at) {
				return this.response.status(400).send({
					status: "Fail",
					message: "Store is inactive. Please contact the admin",
					status_code: 400
				})
			}

			const tags = JSON.parse(tag)
			const productImage = this.request.file('product_image', {
				types: ['image']
			})
			const multipleProductImages = productImage._files
			const imageIds = []
			const variantImageIds = []

			// Create a store product.
			const product = new StoreProduct()

			product.store_id = userStore.id
			product.product_name = product_name
			product.description = description
			product.price = price
			product.discount = discount
			product.stock = stock
			product.category_id = category_id
			product.subcategory_id = subcategory_id
			product.is_enabled = is_published

			await product.save()

			if (productImage) {
				let newImage;

				if (!multipleProductImages) {
					const uploadedImage = await uploadImage(productImage)

					// Create a new image instance for single upload.
					newImage = new Image()
					newImage.image_url = uploadedImage.url
					await newImage.save()

					imageIds.push(newImage.id)
				} else {
					for (var imgKey in multipleProductImages) {
						const uploadedImage = await uploadImage(multipleProductImages[imgKey])

						// Create a single image upload instance.
						newImage = new Image()
						newImage.image_url = uploadedImage.url
						await newImage.save()

						imageIds.push(newImage.id)
					}
				}
			}

			await this.processTags({
				tags,
				productId: product.id
			})

			// Parse variants and create a new ProductVariant instance 
			// for each variant alongside its images.
			if (variants) {
				const parsedVariant = JSON.parse(variants)
				let currentVariant;
				let newVariant

				for (var variant in parsedVariant) {
					currentVariant = parsedVariant[variant]
					newVariant = new ProductVariant()

					newVariant.product_id = product.id
					newVariant.product_variant_name = parsedVariant[variant].variant_name
					newVariant.sku = parsedVariant[variant].sku
					newVariant.price_addon = parsedVariant[variant].price_addon
					newVariant.size = parsedVariant[variant].size
					newVariant.color = parsedVariant[variant].color

					await newVariant.save()

					if (currentVariant.variant_images) {
						for (var variantImage in currentVariant.variant_images) {
							const uploaded_image64 = await uploadBase64(
								currentVariant.variant_images[variantImage]
							)

							const newImage = new Image()
							newImage.image_url = uploaded_image64.url
							await newImage.save()

							variantImageIds.push(newImage.id)
						}

						// Attach all variant images to the created variant instance.
						newVariant
							.product_variant_images()
							.attach(variantImageIds)
					}
				}
			}

			await product.main_product_images().attach(imageIds)

			return this.response.status(200).send({
				message: "Product successfully added to store",
				status_code: 200,
				status: 'Success',
				product
			})

		} catch (addProductError) {
			console.log('addProductError', addProductError)
			return this.response.status(500).send({
				status: "Fail",
				message: "Internal Server Error",
				status_code: 500
			})
		}

	}


}
module.exports = AddProductFeature
