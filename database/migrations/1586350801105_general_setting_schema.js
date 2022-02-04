"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GeneralSettingSchema extends Schema {
  up() {
    this.create("general_settings", (table) => {
      table.increments();
      table.integer("vat").defaultTo(5);
      table.integer("service_charge").defaultTo(500);
      table.timestamps();
    });
  }

  down() {
    this.drop("general_settings");
  }
}

module.exports = GeneralSettingSchema;
