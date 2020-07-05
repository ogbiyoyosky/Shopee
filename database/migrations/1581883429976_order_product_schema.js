'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderProductSchema extends Schema {
  up() {
    this.create('order_products', (table) => {
      table.increments()
      table.integer("store_id")
      table.integer("order_id")
      table.integer("product_id")
      table.integer("qty")
      table.string("color")
      table.string("size")
      table.dateTime("is_deleted_at")
      table.timestamps()
    })
  }

  down() {
    this.drop('order_products')
  }
}

module.exports = OrderProductSchema
