'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderAddressSchema extends Schema {
  up () {
    this.create('order_addresses', (table) => {
      table.increments()
      table.integer('address_id')
      table.integer('order_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('order_addresses')
  }
}

module.exports = OrderAddressSchema
