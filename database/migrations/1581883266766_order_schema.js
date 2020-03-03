'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('amount')
      table.dateTime('is_paid_at').nullable()
      table.dateTime('is_deleted_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
