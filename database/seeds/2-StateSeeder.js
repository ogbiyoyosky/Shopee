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

const State = require('country-state-city').State;

const getStatesOfCountry = (country) => {
  return State.getStatesOfCountry(country.code).map(state => ({
    countryIsoCode: country.code,
    isoCode: state.isoCode,
    state_label: state.name,
    country_id: country.id
  }));
}

class StateSeeder {
  async run() {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;');
    await Database.truncate('states');
    const result = await Database.raw('SELECT id, code FROM country_codes');
    const countries = result[0];

    await Promise.all(
      countries.map(async (country) => {
        const statesOfCountry = getStatesOfCountry(country);
        
        await Database.table('states').insert(statesOfCountry);
      })
    );

    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;');
  }
}

module.exports = StateSeeder;
