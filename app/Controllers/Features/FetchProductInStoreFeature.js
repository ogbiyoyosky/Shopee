'use strict';
const StoreProduct = use('App/Models/StoreProduct');
const Store = use('App/Models/Store');

class FetchProductInStoreFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async fetchProduct() {
    try {
      const { page, limit } = this.request.get();

      const { id } = await this.auth.current.user;

      const store = await Store.query().where('user_id', id).first();

      const storeId = store.id;

      const produceInStore = await StoreProduct.query()
        .whereNull('deleted_at')
        .andWhere('is_enabled', 1)
        .andWhere('store_id', storeId)
        .with('main_product_images')
        .with('category')
        .with('sub_category')
        .with('store')
        .with('tags')
        .with('colors')
        .with('sizes')
        .paginate(page, limit);
      // .fetch();

      console.log(produceInStore);

      const serializedProduct = produceInStore.toJSON();
      console.log(serializedProduct);

      this.response.status(200).send({
        message: 'Successfully fetch all products',
        status: 'success',
        status_code: 200,
        results: serializedProduct,
      });
    } catch (fetchProduceError) {
      console.log('fetchProduceError', fetchProduceError);
      return this.response.status(500).send({
        status: 'fail',
        status_code: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
module.exports = FetchProductInStoreFeature;
