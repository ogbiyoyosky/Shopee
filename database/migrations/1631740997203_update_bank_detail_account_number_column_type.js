'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UpdateBankDetailAccountNumberColumnTypeSchema extends Schema {
  up() {
    this.alter('bank_details', (table) => {
      table.string('account_number').nullable().alter();
    })
  }

  // reverse modification 
  down() {
    this.table('bank_details', (table) => {
      table.number('account_number').nullable().alter();
    })
  }
}

module.exports = UpdateBankDetailAccountNumberColumnTypeSchema
