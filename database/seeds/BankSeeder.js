'use strict'

/*
|--------------------------------------------------------------------------
| BankJSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

const banks = [
  {
   name: 'GTBank'
  },
  {
    name: 'WEMA Bank'
  },
  {
    name: 'Fidelity Bank'
  }]

class BankSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Database.truncate('banks')

    await Database
      .from('banks')
      .insert(banks)

    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}

module.exports = BankSeeder
