'use strict'

/*
|--------------------------------------------------------------------------
| VariantSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const variant = [
  {
   variant: 'Color'
  },
  {
    variant: 'Size'
  },
  {
    variant: 'Material'
  },
]

class VariantSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Database.truncate('variants')

    await Database
      .from('variants')
      .insert(variant)
    
    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}

module.exports = VariantSeeder
