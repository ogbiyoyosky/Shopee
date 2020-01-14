'use strict'
const CreateStoreFeature = use('App/Controllers/Features/CreateStoreFeature')
const ActivateStoreFeature = use('App/Controllers/Features/ActivateStoreFeature')
const FetchStoresInUsersLocationFeature = use('App/Controllers/Features/FetchStoresInUsersLocationFeature')
const ListStoreFeature = use('App/Controllers/Features/ListStoreFeature')
const AddProductFeature = use('App/Controllers/Features/AddProductFeature')
const FetchProductCategoryFeature = use('App/Controllers/Features/FetchProductCategoryFeature')

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

    async fetchStoresInUsersLocation ({
        request,
        response
    }) {
        return new FetchStoresInUsersLocationFeature(request, response, auth).fetchStores(store_id)
    }

    async listStores ({
        response
    }) {
        return new ListStoreFeature(response).listStores()
    }
    async addProduct ({
        request,
        response, 
        auth,
        params: {
            store_id
        }
    }) {
        return new AddProductFeature(request, response, auth).addProduct(store_id)
    }

    async fetchProductCategory ({
        response,
        params: {
            category_id
        }
    }) {
        return new FetchProductCategoryFeature(response).fetchCategory( category_id)
    }


}

module.exports = StoreController
