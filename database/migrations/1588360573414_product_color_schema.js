"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductColorSchema extends Schema {
  up() {
    this.create("product_colors", table => {
      table.increments();
      table.integer("product_id");
      table.text("color");
      table.timestamps();
    });
  }

  down() {
    this.drop("product_colors");
  }
}

module.exports = ProductColorSchema;
