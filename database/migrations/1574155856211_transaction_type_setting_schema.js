'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionTypeSettingSchema extends Schema {
  up () {
    this.create('transaction_type_settings', (table) => {
      table.increments()
      table.string('transaction_type_label')
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('updated_at').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('transaction_type_settings')
  }
}

module.exports = TransactionTypeSettingSchema
