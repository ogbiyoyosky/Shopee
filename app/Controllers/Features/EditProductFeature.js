'use strict'
const StoreProduct = use("App/Models/StoreProduct")
const Store = use("App/Models/Store")
const { uploadImage } = use("App/HelperFunctions/UploadImage")
const Image = use("App/Models/Image")
const ProductTag = use("App/Models/ProductTag")

class EditProductFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }
    
    /**
     * 
     * @param {Integer} product_id - id of the product
     * @return {Object} -response -ctx
     */
    async editProduct(product_id) {
        try {
            const user = this.auth.current.user
            const user_id = user.id
            const user_store = await Store.findBy('user_id', user_id)
            const {
                product_name,
                description,
                total_stock,
                category_id,
                sub_category_id,
                short_description,
                is_published,
                tag,
                price
            } = this.request.all()

            const tags = JSON.parse(tag)

            if(user_store.is_activated_at == null) {
                return this.response.status(400).send({
                    status: "Fail",
                    message: "Store is inactive please contact the admin",
                    status_code: 400
                }) 
            }

            const product_image =  this.request.file('product_image', {
                types: ['image']
            })

            const mutiple_image = product_image._files

            const product = await StoreProduct.findBy("id", product_id)
            product.merge({
                product_name,
                description,
                price,
                total_stock,
                category_id,
                sub_category_id,
                short_description,
                is_enabled:is_published
            })
            await product.save()

            const imagesIds = []
            
            if(product_image) {
                
                if(mutiple_image == undefined) {
                    const uploaded_image = await uploadImage(product_image)
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
           
            const existingTags = await ProductTag.findBy("product_id", product_id)
            await existingTags.delete()
            //add new entry
            for(var i in tags) {
                const new_tag = new ProductTag()
                new_tag.product_id = product.id
                new_tag.tag = tags[i]
                new_tag.save()
            }

            
            //add to pivot table
            await product.main_product_images().sync(imagesIds)
            return this.response.status(200).send({
            message: "Product successfully updated",
            status_code: 200,
            status: 'Success',
            product
          })


        } catch(editProductError) {
            console.log("editProductError",editProductError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        }

    }

  
}
module.exports = EditProductFeature