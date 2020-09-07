'use strict';

/*
|--------------------------------------------------------------------------
| StateSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Database = use('Database');

class StateSeeder {
  async run() {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;');
    await Database.truncate('states');
    const country_id = 1;
    const state = await Database.table('states').insert([
      {
        state_label: 'Abia',
        country_id,
      },
      {
        state_label: 'Adamawa',
        country_id,
      },
      {
        state_label: 'Akwa Ibom',
        country_id,
      },
      {
        state_label: 'Anambra',
        country_id,
      },
      {
        state_label: 'Bauchi',
        country_id,
      },
      {
        state_label: 'Bayelsa',
        country_id,
      },
      {
        state_label: 'Benue',
        country_id,
      },
      {
        state_label: 'Borno',
        country_id,
      },
      {
        state_label: 'Cross River',
        country_id,
      },
      {
        state_label: 'Delta',
        country_id,
      },
      {
        state_label: 'Ebonyi',
        country_id,
      },
      {
        state_label: 'Edo',
        country_id,
      },
      {
        state_label: 'Ekiti',
        country_id,
      },
      {
        state_label: 'Enugu',
        country_id,
      },
      {
        state_label: 'Federal Capital Territory',
        country_id,
      },
      {
        state_label: 'Gombe',
        country_id,
      },
      {
        state_label: 'Imo',
        country_id,
      },
      {
        state_label: 'Jigawa',
        country_id,
      },
      {
        state_label: 'Kaduna',
        country_id,
      },
      {
        state_label: 'Kano',
        country_id,
      },
      {
        state_label: 'Katsina',
        country_id,
      },
      {
        state_label: 'Kebbi',
        country_id,
      },
      {
        state_label: 'Kogi',
        country_id,
      },
      {
        state_label: 'Kwara',
        country_id,
      },
      {
        state_label: 'Lagos',
        country_id,
      },
      {
        state_label: 'Nasarawa',
        country_id,
      },
      {
        state_label: 'Niger',
        country_id,
      },
      {
        state_label: 'Ogun',
        country_id,
      },
      {
        state_label: 'Ondo',
        country_id,
      },
      {
        state_label: 'Osun',
        country_id,
      },
      {
        state_label: 'Oyo',
        country_id,
      },
      {
        state_label: 'Plateau',
        country_id,
      },
      {
        state_label: 'Rivers',
        country_id,
      },
      {
        state_label: 'Sokoto',
        country_id,
      },
      {
        state_label: 'Taraba',
        country_id,
      },
      {
        state_label: 'Yobe',
        country_id,
      },
      {
        state_label: 'Zamfara',
        country_id,
      },
    ]);

    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;');
  }
}

module.exports = StateSeeder;
