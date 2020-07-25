'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductTagSchema extends Schema {
  up () {
    this.create('product_tags', (table) => {
      table.increments()
      table.integer('product_id')
      table.string('tag')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_tags')
  }
}

module.exports = ProductTagSchema
