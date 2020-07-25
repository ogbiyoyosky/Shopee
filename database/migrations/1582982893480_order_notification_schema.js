'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderNotificationSchema extends Schema {
  up() {
    this.create('order_notifications', (table) => {
      table.increments()
      table.integer("seller_id")
      table.integer("buyer_id")
      table.integer("order_id")
      table.dateTime("is_completed_at")
      table.timestamps()
    })
  }

  down() {
    this.drop('order_notifications')
  }
}

module.exports = OrderNotificationSchema
