'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddTrackingIdColumnToStatesSchema extends Schema {
  up () {
    this
      .raw("SET sql_mode='TRADITIONAL'")
      .table('states', (table) => {
        // alter table
        table.string('tracking_id');
      })
  }

  down () {
    this.table('states', (table) => {
      // reverse alternations
        table.dropColumn('tracking_id')
    })
  }
}

module.exports = AddTrackingIdColumnToStatesSchema
