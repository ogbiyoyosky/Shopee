'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionTokenSchema extends Schema {
  up () {
    this.create('transaction_tokens', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('token', 40).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('transaction_tokens')
  }
}

module.exports = TransactionTokenSchema
