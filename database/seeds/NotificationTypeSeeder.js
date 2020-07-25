'use strict'

/*
|--------------------------------------------------------------------------
| NotificationTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

const notification_type = [
  {
   'notification_type_label': 'Withdrawal Notification'
  },
  {
    'notification_type_label': 'Transfer Notification'
  },
  {
    'notification_type_label': 'Deposit Notification'
  }
]

class NotificationTypeSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Database.truncate('notification_types')

    await Database
      .from('notification_types')
      .insert(notification_type)
    
    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')

  }
}

module.exports = NotificationTypeSeeder
