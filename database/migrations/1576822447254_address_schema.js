'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up() {
    this.create('addresses', (table) => {
      table.increments()
      table.integer('user_id')
      table.boolean('primary').default(0)
      table.string('address')
      table.integer('province_id')
      table.integer('state_id')
      table.integer('country_id')
      table.timestamps()
    })
  }

  down() {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
