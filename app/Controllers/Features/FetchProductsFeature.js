'use strict'
const Database = use("Database")

class FetchProductsFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async fetchProduct() {
        try {

            const {province, region} = this.request.all()

            const products = await Database.from("store_products")    
            .select('*') 
            .whereIn('store_id', (
                await Database.from("stores")    
                .select('id') 
                .where("province_id", 1)
                .andWhere("state_id", 1))
            )


            console.log(products)

        } catch (fetchProductError) {
            
        }
    }

  
}
module.exports = FetchProductsFeature