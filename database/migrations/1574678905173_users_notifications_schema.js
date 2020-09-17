'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserNotificationsSchema extends Schema {
  up () {
    this.create('users_notifications', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('notification_id')
      table.integer('is_read').defaultTo(0)
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('updated_at').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('users_notifications')
  }
}

module.exports = UserNotificationsSchema
