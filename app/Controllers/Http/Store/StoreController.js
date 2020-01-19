"use strict";
const CreateStoreFeature = use(
  "App/Controllers/Features/CreateStoreFeature"
  );
const ActivateStoreFeature = use(
  "App/Controllers/Features/ActivateStoreFeature"
);
const FetchStoresInUsersLocationFeature = use(
  "App/Controllers/Features/FetchStoresInUsersLocationFeature"
);
const ListStoreFeature = use("App/Controllers/Features/ListStoreFeature");
const AddProductFeature = use("App/Controllers/Features/AddProductFeature");
const FetchProductCategoryFeature = use(
  "App/Controllers/Features/FetchProductCategoryFeature"
);
const FetchProduceInStoreFeature = use(
  "App/Controllers/Features/FetchProductInStoreFeature"
);

const AddVariantToProductFeature = use(
  "App/Controllers/Features/AddVariantToProductFeature"
);

const EditProductFeature = use(
  "App/Controllers/Features/EditProductFeature"
);

const DeleteProductFeature = use(
  "App/Controllers/Features/DeleteProductFeature"
);

const EditVariantFeature = use(
  "App/Controllers/Features/EditVariantFeature"
);

const DeleteVariantFeature = use(
  "App/Controllers/Features/DeleteVariantFeature"
);

class StoreController {
  
  
  async createStore({ request, response, auth }) {
    return new CreateStoreFeature(request, response, auth).createStore();
  }

  async activateStore({ request, response, auth, params: { store_id } }) {
    return new ActivateStoreFeature(request, response, auth).activateStore(
      store_id
    );
  }

  async fetchStoresInUsersLocation({ request, response }) {
    return new FetchStoresInUsersLocationFeature(request,response,auth).fetchStores(store_id);
  }

  async listStores({ response }) {
    return new ListStoreFeature(response).listStores();
  }
  async addProduct({ request, response, auth, params: { store_id } }) {
    return new AddProductFeature(request, response, auth).addProduct(store_id);
  }

  async fetchProductCategory({ response, params: { category_id } }) {
    return new FetchProductCategoryFeature(response).fetchCategory(category_id);
  }

  async listProduct ({request, response,  params: { store_id } }) {
    return new FetchProduceInStoreFeature(request, response).fetchProduct(store_id)
  }

  async addVariant ({request, response,  params: { product_id } }) {
    return new AddVariantToProductFeature(request, response).addVariant( product_id)
  }

  async editProduct ({request, response, auth,  params: { product_id } }) {
    return new EditProductFeature(request, response, auth).editProduct( product_id)
  }

  async deleteProduct ({request, response, auth,  params: { product_id } }) {
    return new DeleteProductFeature(request, response, auth).deleteProduct( product_id)
  }

  async editVariant ({request, response, auth,  params: { product_id, variant_id } }) {
    return new EditVariantFeature(request, response, auth).editVariant( product_id, variant_id)
  }

  async deleteVariant ({request, response, auth,  params: { product_id, variant_id } }) {
    return new DeleteVariantFeature(request, response, auth).deleteVariant( product_id, variant_id)
  }

}

module.exports = StoreController;
