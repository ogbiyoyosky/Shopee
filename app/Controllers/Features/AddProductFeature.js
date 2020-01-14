'use strict'
const StoreProduct = use("App/Models/StoreProduct")

class AddProductFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async addProduct() {
        try {
            const user = auth.current.user
            const {
                store_id,
                product_name,
                description,
                total_stock,
                category_id,
                sub_category_id,
                short_description,
                is_enabled
            }

            const product = new StoreProduct()
            product.store_id = store_id
            product.product_name = product_name
            product.description = description
            product.total_stock = total_stock
            product.category_id = category_id
            product.sub_category_id = sub_category_id
            product.short_description = short_description
            product.is_enabled = is_enabled
            await product.save()


            
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