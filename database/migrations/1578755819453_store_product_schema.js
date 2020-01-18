'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreProductSchema extends Schema {
  up () {
    this.create('store_products', (table) => {
      table.increments()
      table.integer('store_id')
      table.string('product_name')
      table.string('description')
      table.integer('total_stock')
      table.float('price')
      table.integer('category_id')
      table.integer('sub_category_id')
      table.string('short_description')
      table.boolean('is_enabled')
      table.timestamps()
    })
  }

  down () {
    this.drop('store_products')
  }
}

module.exports = StoreProductSchema
