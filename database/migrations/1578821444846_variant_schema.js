'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VariantSchema extends Schema {
  up () {
    this.create('variants', (table) => {
      table.increments()
      table.string('variant')
      table.timestamps()
    })
  }

  down () {
    this.drop('variants')
  }
}

module.exports = VariantSchema
