'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BankDetailSchema extends Schema {
  up () {
    this.create('bank_details', (table) => {
      table.increments()
      table.integer('bank_id').notNullable(),
      table.integer('account_type_id').notNullable(),
      table.string('account_name', 254).notNullable(),
      table.integer('account_number', 15).notNullable(),
      table.timestamps()
    })
  }

  down () {
    this.drop('bank_details')
  }
}

module.exports = BankDetailSchema
