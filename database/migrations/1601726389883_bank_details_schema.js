'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BankDetailSchema extends Schema {
  up () {
    this.create('bank_details', (table) => {
      table.increments()
      table.string('bank_id').notNullable(),
      table.string('account_name', 254).nullable(),
      table.integer('account_number').nullable(),
      table.integer('user_id').nullable(),
      table.timestamps()
    })
  }

  down () {
    this.drop('bank_details')
  }
}

module.exports = BankDetailSchema
