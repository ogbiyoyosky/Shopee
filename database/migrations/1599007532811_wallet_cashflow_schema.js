'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class WalletCashflowSchema extends Schema {
  up() {
    this.create('wallet_cashflows', (table) => {
      table.increments();
      table.integer('wallet_id');
      table.boolean('is_cleared').defaultTo(false);
      table.string('type', 30).notNullable();
      table.string('description', 255).nullable();
      table.float('amount').defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop('wallet_cashflows');
  }
}

module.exports = WalletCashflowSchema;
