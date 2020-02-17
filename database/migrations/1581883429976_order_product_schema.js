'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderProductSchema extends Schema {
  up () {
    this.create('order_products', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('order_products')
  }
}

module.exports = OrderProductSchema
