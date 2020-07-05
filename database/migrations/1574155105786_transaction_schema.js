"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TransactionSchema extends Schema {
  up() {
    this.create("transactions", (table) => {
      table.increments();
      table.integer("user_id");
      table.float("amount");
      table.string("status");
      table.string("transaction_reference");
      table.string("transaction_description").nullable();
      table.string("transaction_type_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("transactions");
  }
}

module.exports = TransactionSchema;
