'use strict'

/*
|--------------------------------------------------------------------------
| ProvinceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')


const CountryCityState = require('country-state-city').default;

const getCitiesOfState = (state) => {
  return CountryCityState.getCitiesOfState(state.tracking_id).map(city => ({
    province_label: city.name,
    state_id: state.id
  }));
}

class ProvinceSeeder {
  async run() {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;');
    await Database.truncate('provinces');
    const result = await Database.raw('SELECT id, tracking_id FROM states');
    const states = result[0];

    await Promise.all(
      states.map(async (state) => {
        const citiesOfState = getCitiesOfState(state);
        console.log(citiesOfState);
        
        await Database.table('provinces').insert(citiesOfState);
      })
    );

    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;');
  }
}

module.exports = ProvinceSeeder
