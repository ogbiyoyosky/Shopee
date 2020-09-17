'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreProductImagesSchema extends Schema {
  up() {
    this.create('store_product_images', (table) => {
      table.increments()
      table.integer('product_id')
      table.integer("image_id")
      table.timestamps()
    })
  }

  down() {
    this.drop('store_product_images')
  }
}

module.exports = StoreProductImagesSchema
