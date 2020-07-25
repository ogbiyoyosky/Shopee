'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreSchema extends Schema {
  up () {
    this.create('stores', (table) => {
      table.increments()
      table.string('store_name')
      table.integer('user_id')
      table.integer('country_id')
      table.integer('state_id')
      // table.string('store_address').notNullable().unique()
      // table.string('store_formatted_address').notNullable().unique()
      // table.string('longitude').notNullable()
      // table.string('latitude').notNullable()
      table.integer('province_id')
      table.boolean('sell_outside_state').defaultTo(0)
      table.integer('sell_outside_province').defaultTo(0)
      table.dateTime('is_activated_at').defaultTo(null)
      table.dateTime('is_deactivated_at').defaultTo(null)
      table.integer('is_deactivated_by')
      table.integer('is_activated_by')
      table.timestamps()
    })
  }

  down () {
    this.drop('stores')
  }
}

module.exports = StoreSchema
