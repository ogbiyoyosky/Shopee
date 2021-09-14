'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('first_name')
      table.string('last_name')
      table.integer('country_id')
      table.integer('province_id')
      table.integer('state_id')
      table.string('gender')
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
