'use strict'
const StoreProduct = use("App/Models/StoreProduct")
const Store = use("App/Models/Store")
const { uploadImage } = use("App/HelperFunctions/UploadImage")
const Image = use("App/Models/Image")
const ProductTag = use("App/Models/ProductTag")

class AddProductFeature {
    constructor (  request, response, auth) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async addProduct() {
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
            console.log(price)
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

            const product = new StoreProduct()
            product.store_id = user_store.id
            product.product_name = product_name
            product.description = description
            product.price = price
            product.total_stock = total_stock
            product.category_id = category_id
            product.sub_category_id = sub_category_id
            product.short_description = short_description
            product.is_enabled = is_published
            await product.save()
            const imagesIds = []
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

            for(var i in tags) {
                const new_tag = new ProductTag()
                new_tag.product_id = product.id
                new_tag.tag = tags[i]
                new_tag.save()
            }

            //add to pivot table
            console.log(imagesIds)
            await product.mainProductImages().attach(imagesIds)
           return this.response.status(200).send({
            message: "Product successfully added to store",
            status_code: 200,
            status: 'Success',
            product
          })


            
        } catch(addProductError) {
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