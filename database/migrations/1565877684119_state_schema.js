'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StateSchema extends Schema {
  up () {
    this.create('states', (table) => {
      // table.charset('latin1')
      // table.collate('latin1_swedish_ci')
			table.increments()
      table.string('countryIsoCode')
      table.string('isoCode')
      table.string('state_label')
      table.integer('country_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('states')
  }
}

module.exports = StateSchema
