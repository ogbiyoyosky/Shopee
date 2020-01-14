'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductVariantSchema extends Schema {
  up () {
    this.create('product_variants', (table) => {
      table.increments()
      table.integer('product_id')
      table.string('product_variant_name')
      table.string('sku')
      table.float('price')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_variants')
  }
}

module.exports = ProductVariantSchema
