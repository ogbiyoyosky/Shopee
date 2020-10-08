'use strict'

/*
|--------------------------------------------------------------------------
| CountryCodeSeeder
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

const countries = CountryCityState.getAllCountries();

const getFormattedCountry = (country) => ({
  tracking_id: Number(country.id),
  name: country.name,
  dial_code: country.phonecode,
  code: country.sortname,
});

class CountryCodeSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Database.truncate('country_codes')
    const country_codes = await Database
      .table('country_codes')
      .insert(countries.map(getFormattedCountry));

    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}

module.exports = CountryCodeSeeder
