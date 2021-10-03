'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddRecipientIdColumnToBankDetailsSchema extends Schema {
  up () {
    this
      .raw("SET sql_mode='TRADITIONAL'")
      .table('bank_details', (table) => {
        // alter table
        table.string('recipient_id');
      })
  }

  down () {
    this.table('bank_details', (table) => {
      // reverse alternations
        table.dropColumn('recipient_id')
    })
  }
}

module.exports = AddRecipientIdColumnToBankDetailsSchema
