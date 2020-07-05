"use strict";
const Product = use("App/Models/StoreProduct");
const Query = use("Query");
const Store = use("App/Models/Store")

class SearchFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async listSearchResults() {
    const { q, page = 1, province } = this.request.all();

    try {
      const query = new Query(this.request, { order: "id", search: q, province, page });
      const order = query.order();

      const searcResult = Product.query()

      if (province) {
        const storeIds = await Store.query()
          .where("province_id", province)
          .pluck("id")

        console.log(storeIds)

        searcResult
          .whereIn("store_id", storeIds)
          .andWhere(query.search(["product_name", "description"]))
          .with("category")
          .with("sub_category")
          .with("main_product_images")
          .with("tags")
          .with("colors")
          .with("sizes")
          .with("store")
      } {
        searcResult
          .where(query.search(["product_name", "description"]))
          .with("category")
          .with("sub_category")
          .with("main_product_images")
          .with("tags")
          .with("colors")
          .with("sizes")
          .with("store")
          .orderBy(order.column, order.direction)
          .paginate(query.page(), query.limit());
      }

      const products = await searcResult.where('is_enabled', 1)
        .orderBy(order.column, order.direction)
        .paginate(query.page(), query.limit());


      return this.response.status(200).send({
        status: "success",
        status_code: 200,
        message: "",
        result: products
      });
    } catch (_) {
      console.log(_);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500
      });
    }
  }
}

module.exports = SearchFeature;
