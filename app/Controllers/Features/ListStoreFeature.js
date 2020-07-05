'use strict'
const Store = use('App/Models/Store')

class ListStoreFeature {
    constructor ( response ) {
        this.response = response
    }

async listStores() {
    try {
        const stores = await Store.query()
        .select('id','store_name','is_activated_at','is_deactivated_at','is_deactivated_by','is_activated_by')
        .fetch()

        const serializedStores = stores.toJSON()

        return this.response.status(200).send({
            status: 'success',
          status_code: 200,
          message: 'Successfully fetch all stores',
          result: serializedStores
        })

    } catch(listStoresError) {
        console.log('listStoresError -> ', listStoresError);
        return this.response.status(500).send({
            status: "Fail",
            message: "Internal Server Error",
            status_code: 500
        })
    }
}

  
}
module.exports = ListStoreFeature