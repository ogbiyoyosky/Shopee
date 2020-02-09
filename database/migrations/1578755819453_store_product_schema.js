'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreProductSchema extends Schema {
  up() {
    this.create('store_products', (table) => {
      table.increments()
      table.integer('store_id')
      table.string('product_name')
      table.string('description')
      table.integer('stock')
      table.float('price')
      table.integer('category_id')
      table.integer('subcategory_id')
      table.boolean('is_enabled')
      table.dateTime('deleted_at').defaultTo(null)
      table.timestamps()
    })
  }

  down() {
    this.drop('store_products')
  }
}

module.exports = StoreProductSchema
