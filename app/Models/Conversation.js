'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Conversation extends Model {
    conversationMessage() {
        return this.hasMany("App/Models/ConversationMessage", "id", "conversation_id")
    }

    user() {
        return this.hasOne('App/Models/User', 'user_id', 'id')
    }
}

module.exports = Conversation
