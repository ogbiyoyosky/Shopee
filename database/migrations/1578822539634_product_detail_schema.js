'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductDetailSchema extends Schema {
  up () {
    this.create('product_details', (table) => {
      table.increments()
      table.integer('product_variant_id')
      table.integer('variant_value_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_details')
  }
}

module.exports = ProductDetailSchema
