"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class OrderProduct extends Model {
  products() {
    return this.hasMany("App/Models/StoreProduct", "product_id", "id");
  }
}

module.exports = OrderProduct;
