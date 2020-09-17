'use strict'

/*
|--------------------------------------------------------------------------
| GeneralSettingSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const GeneralSetting = use("App/Models/GeneralSetting")

class GeneralSettingSeeder {
  async run() {
    const setting = new GeneralSetting()
    await setting.save()
  }
}

module.exports = GeneralSettingSeeder
