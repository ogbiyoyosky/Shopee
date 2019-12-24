'use strict'
const CreateStoreFeature = use('App/Controllers/Features/CreateStoreFeature')

class StoreController {
    async createStore ({
        request,
        response,
        auth
    }) {
        return new CreateStoreFeature(request, response, auth).createStore()
    }
}

module.exports = StoreController
