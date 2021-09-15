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
   name: 'GTBank',
   created_at: new Date(),
   updated_at: new Date(),
  },
  {
    name: 'WEMA Bank',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Fidelity Bank',
    created_at: new Date(),
    updated_at: new Date(),
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
