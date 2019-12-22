'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.integer('user_id')
      table.boolean('primary')
      table.string('address')
      table.string('locality_id')
      table.string('state_id')
      table.integer('postcode')
      table.string('country_id')



      table.timestamps()
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
