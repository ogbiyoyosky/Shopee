"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderSchema extends Schema {
  up() {
    this.create("orders", (table) => {
      table.increments();
      table.integer("user_id");
      table.integer("amount");
      table.dateTime("is_paid_at").nullable();
      table.string("placement_code");
      table.dateTime("declined_at");
      table.dateTime("delivered_at");
      table.dateTime("buyer_confirms_delivery_at");
      table.integer("delivery_time_addon").defaultTo(24);
      table.float("service_charge");
      table.float("vat");
      table.dateTime("buyer_accepted_at");
      table.dateTime("seller_accepted_at");
      table.float("shipping_cost");
      table.dateTime("is_deleted_at").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("orders");
  }
}

module.exports = OrderSchema;
