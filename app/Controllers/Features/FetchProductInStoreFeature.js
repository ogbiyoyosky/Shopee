'use strict'
const StoreProduce = use("App/Models/StoreProduct")

class FetchProductInStoreFeature {
    constructor ( response ) {
        this.response = response
    } 

    async fetchProduce (store_id) {
        try {
            const produceInStore = await StoreProduce.query()
            .where("store_id", store_id)
            .fetch()
            
        } catch (fetchProduceError) {
            console.log("fetchProduceError",fetchProduceError)
            return this.response.status(500).send({
                status: 'fail',
                status_code: 500,
                message: 'Internal Server Error'
              })
            
        }
    }
}
module.exports = FetchProductInStoreFeature