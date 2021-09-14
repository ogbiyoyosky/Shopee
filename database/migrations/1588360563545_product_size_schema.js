'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSizeSchema extends Schema {
  up() {
    this.create('product_sizes', (table) => {
      table.increments()
      table.integer('product_id')
      table.string('size')
      table.timestamps()
    })
  }

  down() {
    this.drop('product_sizes')
  }
}

module.exports = ProductSizeSchema
