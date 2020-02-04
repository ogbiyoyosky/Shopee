'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductVariantImageSchema extends Schema {
  up () {
    this.create('product_variant_images', (table) => {
      table.increments()
      table.integer("main_product_id")
      table.integer("product_variant_id")
      table.integer("image_id")
      table.timestamps()
    })
  }

  down () {
    this.drop('product_variant_images')
  }
}

module.exports = ProductVariantImageSchema
