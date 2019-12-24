'use strict'
const CreateStoreFeature = use('App/Controllers/Features/CreateStoreFeature')
const ActivateStoreFeature = use('App/Controllers/Features/ActivateStoreFeature')

class StoreController {
    async createStore ({
        request,
        response,
        auth,
    }) {
        return new CreateStoreFeature(request, response, auth).createStore()
    }

    async activateStore ({
        request,
        response,
        auth,
        params: {
            store_id
        }
    }) {
        return new ActivateStoreFeature(request, response, auth).activateStore( store_id)
    }
}

module.exports = StoreController
