'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up() {
    this.create('orders', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('amount')
      table.dateTime('is_paid_at').nullable()
      table.string("placement_code")
      table.dateTime("declined_at")
      table.integer("is_delivered")
      table.float("service_charge")
      table.dateTime("buyer_accepted_at")
      table.dateTime("seller_accepted_at")
      table.integer("shipping_cost")
      table.dateTime('is_deleted_at').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('orders')
  }
}

module.exports = OrderSchema
