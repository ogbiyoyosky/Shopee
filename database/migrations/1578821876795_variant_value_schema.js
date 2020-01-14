'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VariantValueSchema extends Schema {
  up () {
    this.create('variant_values', (table) => {
      table.increments()
      table.integer('variant_id')
      table.string('value')
      table.timestamps()
    })
  }

  down () {
    this.drop('variant_values')
  }
}

module.exports = VariantValueSchema
