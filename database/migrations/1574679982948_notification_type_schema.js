'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationTypeSchema extends Schema {
  up () {
    this.create('notification_types', (table) => {
      table.increments()
      table.string('notification_type_label')
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('updated_at').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('notification_types')
  }
}

module.exports = NotificationTypeSchema
