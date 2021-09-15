'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddTrackingIdColumnToProvincesSchema extends Schema {
  up () {
    this
      .raw("SET sql_mode='TRADITIONAL'")
      .table('country_codes', (table) => {
        // alter table
        table.string('tracking_id');
      })
  }

  down () {
    this.table('country_codes', (table) => {
      // reverse alternations
        table.dropColumn('tracking_id')
    })
  }
}

module.exports = AddTrackingIdColumnToProvincesSchema
