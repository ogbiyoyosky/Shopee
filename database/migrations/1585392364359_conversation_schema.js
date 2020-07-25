
'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConversationSchema extends Schema {
  up() {
    this.create('conversations', (table) => {
      table.increments()
      table.integer("order_id")
      table.timestamps()
    })
  }

  down() {
    this.drop('conversations')
  }
}

module.exports = ConversationSchema
