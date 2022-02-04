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


const City = require('country-state-city');

console.log("Cities", City);

const getCitiesOfState = (state) => {
  return City.getCitiesOfState(state.countryIsoCode, state.isoCode).map(city => ({
    province_label: city.name,
    state_id: state.id
  }));
}

class ProvinceSeeder {
  async run() {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;');
    await Database.truncate('provinces');
    const result = await Database.raw('SELECT * FROM states');
    const states = result[0];
    console.log({ states, result })

    for (let i = 0; i < states.length; i++) {
      const citiesOfState = getCitiesOfState(states[i]);
      console.log(citiesOfState);
      
      await Database.table('provinces').insert(citiesOfState);
    }

    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;');
  }
}

module.exports = ProvinceSeeder
