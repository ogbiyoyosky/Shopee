'use strict'
const StoreProduct = use("App/Models/StoreProduct")
const VariantValue = use("App/Models/VariantValue")
const ProductVariant = use("App/Models/ProductVariant")
const ProductDetail = use("App/Models/ProductDetail")
const { uploadImage } = use("App/HelperFunctions/UploadImage")
const Image = use("App/Models/Image")

class EditVariantFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async editVariant (product_id, variant_id) {
        const {
            variant_name,
            variant_type_id,
            variant_value,
            sku,
            price_valuation_degree,
        } = this.request.all()

        const variant_image =  this.request.file('variant_image', {
            types: ['image']
        })

        const product = await StoreProduct.findBy("id", product_id)
       
        const mutiple_image = variant_image._files

        const variantValue = new VariantValue()
        variantValue.variant_id = variant_type_id,
        variantValue.value = variant_value
        await variantValue.save()


        const productVariant =await ProductVariant.findBy("id", variant_id)
        
        productVariant.merge({
            product_variant_name:variant_name,
            sku,
            price_on_variant: price_valuation_degree
        })
        await productVariant.save()

        const productDetail = await ProductDetail.findBy("product_variant_id",productVariant.id)
        productDetail.merge({
            price : parseInt(product.price) + parseInt(price_valuation_degree),
            variant_value_id: variantValue.id
        })
        await productDetail.save()

        const imagesIds = []
        
        if(variant_image) {
            
            if(mutiple_image == undefined) {
                const uploaded_image = await uploadImage(variant_image )
                const newImage = new Image()
                newImage.image_url = uploaded_image.url
                await newImage.save()
                imagesIds.push(newImage.id)
               
            } else{
                for(var i in mutiple_image) {
                    const uploaded_image = await uploadImage(mutiple_image[i])
                    const newImage = new Image()
                    newImage.image_url = uploaded_image.url
                    await newImage.save()
                    imagesIds.push(newImage.id)
                }
    
            }
           
        }
      
        await productVariant.product_variant_images().sync(imagesIds,(row)=>{
            row.main_product_id =  product.id
        })

        return this.response.status(200).send({
            message: "Variant successfully edited",
            status_code: 200,
            status: 'Success'
          })

    }

  
}
module.exports = EditVariantFeature