'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProvinceSchema extends Schema {
  up () {
    this.create('provinces', (table) => {
      table.increments()
      table.integer('state_id')
      table.string('province_label')
      table.timestamps()
    })
  }

  down () {
    this.drop('provinces')
  }
}

module.exports = ProvinceSchema
