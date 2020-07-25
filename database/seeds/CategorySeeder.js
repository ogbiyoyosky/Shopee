'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

const categories = [
  {
   category_label: 'Computers and Accessories'
  },
  {
    category_label: 'Phones and Tablets'
  },
  {
    category_label: 'Electronics'
  },
  {
    category_label: 'Fashion'
  },
  {
    category_label: 'Home and Kitchen'
  },
  {
    category_label: 'Baby, Kids and Toys'
  },
  {
    category_label: 'Automobiles'
  },
  {
    category_label: 'Wines & Other Categories'
  }]

class CategorySeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Database.truncate('categories')

    await Database
      .from('categories')
      .insert(categories)

    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}

module.exports = CategorySeeder
