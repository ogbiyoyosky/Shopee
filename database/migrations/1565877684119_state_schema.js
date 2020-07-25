'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StateSchema extends Schema {
  up () {
    this.create('states', (table) => {
			table.increments()
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
