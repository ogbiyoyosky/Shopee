"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ConversationMessageSchema extends Schema {
  up() {
    this.create("conversation_messages", table => {
      table.increments();
      table.integer("conversation_id");
      table.text("message");
      table.integer("user_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("conversation_messages");
  }
}

module.exports = ConversationMessageSchema;
