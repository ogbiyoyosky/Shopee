'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WalletSchema extends Schema {
  up() {
    this.create('wallets', (table) => {
      table.increments()
      table.integer('user_id')
      table.float('balance').defaultTo(0)
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('updated_at').defaultTo(this.fn.now())
    })
  }

  down() {
    this.drop('wallets')
  }
}

module.exports = WalletSchema
