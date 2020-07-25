"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ConversationConverserSchema extends Schema {
  up() {
    this.create("conversation_conversers", table => {
      table.increments();
      table.integer("conversation_id");
      table.integer("unread_messages").defaultTo(0);
      table.integer("user_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("conversation_conversers");
  }
}

module.exports = ConversationConverserSchema;
