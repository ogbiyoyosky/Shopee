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

const CountryCityState = require('country-state-city').default;

const getStatesOfCountry = (country) => {
  return CountryCityState.getStatesOfCountry(country.tracking_id).map(state => ({
    tracking_id: state.id,
    state_label: state.name,
    country_id: country.id
  }));
}

class StateSeeder {
  async run() {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;');
    await Database.truncate('states');
    const result = await Database.raw('SELECT id, tracking_id FROM country_codes');
    const countries = result[0];

    await Promise.all(
      countries.map(async (country) => {
        const statesOfCountry = getStatesOfCountry(country);
        console.log(statesOfCountry);
        
        await Database.table('states').insert(statesOfCountry);
      })
    );

    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;');
  }
}

module.exports = StateSeeder;
