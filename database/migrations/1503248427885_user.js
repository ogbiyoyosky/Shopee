'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
			table.string('password').notNullable()
			table.string('email').notNullable()
      table.bigInteger('phone_number').unique().notNullable()
      table.string('confirmation_token').notNullable()
			table.dateTime('is_activated_at').nullable()
			table.dateTime('is_deleted_at').nullable()
			table.integer('role_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
