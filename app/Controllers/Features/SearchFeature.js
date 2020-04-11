"use strict";
const Product = use("App/Models/StoreProduct");
const Query = use("Query");

class SearchFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async listSearchResults() {
    const { q, page = 1 } = this.request.all();

    try {
      const query = new Query(this.request, { order: "id", search: q, page });
      const order = query.order();
      console.log({ q });

      const products = await Product.query()
        .where(query.search(["product_name", "description"]))
        .with("category")
        .with("sub_category")
        .with("tags")
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
