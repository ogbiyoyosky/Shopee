'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubCategorySchema extends Schema {
  up () {
    this.create('sub_categories', (table) => {
      table.increments()
      table.string('sub_category_label')
      table.integer('category_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('sub_categories')
  }
}

module.exports = SubCategorySchema
