'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductDetailSchema extends Schema {
  up () {
    this.create('product_details', (table) => {
      table.increments()
      table.integer('product_variant_id')
      table.integer('product_id')
      table.integer('price')
      table.integer('variant_value_id')
      table.dateTime("is_deleted_at")
      table.timestamps()
    })
  }

  down () {
    this.drop('product_details')
  }
}

module.exports = ProductDetailSchema
