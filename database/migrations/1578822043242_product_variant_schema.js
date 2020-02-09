'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductVariantSchema extends Schema {
  up() {
    this.create('product_variants', (table) => {
      table.increments()
      table.integer('product_id')
      table.string('product_variant_name')
      table.string('sku').nullable()
      table.float('price_addon').defaultTo(0)
      table.string('size').nullable()
      table.string('color').nullable()
      table.dateTime('deleted_at').defaultTo(null)
      table.timestamps()
    })
  }

  down() {
    this.drop('product_variants')
  }
}

module.exports = ProductVariantSchema
