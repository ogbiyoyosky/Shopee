'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WithdrawalSchema extends Schema {
  up () {
    this.create('withdrawals', (table) => {
      table.increments()
      table.string('transaction_id').notNullable(),
      table.integer('wallet_cashflow_id').notNullable(),
      table.boolean('is_successful').nullable(),
      table.timestamps()
    })
  }

  down () {
    this.drop('withdrawals')
  }
}

module.exports = WithdrawalSchema
