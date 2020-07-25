'use strict'

/*
|--------------------------------------------------------------------------
| TransactionTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

const transaction_type = [
  {
    'transaction_type_label': 'Deposit'
  },
  {
    'transaction_type_label': 'Payment'
  }
]


class TransactionTypeSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Database.truncate('transaction_type_settings')

    await Database
      .from('transaction_type_settings')
      .insert(transaction_type)
    
    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')

  }
}

module.exports = TransactionTypeSeeder
