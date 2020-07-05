'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CountryCodeSchema extends Schema {
  up () {
    this.create('country_codes', (table) => {
			table.increments()
			table.string('name')
      table.string('dial_code')
      table.string('code')
      table.timestamps()
    })
  }

  down () {
    this.drop('country_codes')
  }
}

module.exports = CountryCodeSchema
