'use strict'
const Conversation = use("App/Models/Conversation")
const ConversationMessage = use("App/Models/ConversationMessage")
const ConversationConverser = use("App/Models/ConversationConverser")

class OrderChatFeature {
    constructor(request, response, auth) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async sendMessage() {
        try {
            const { id } = this.auth.current.user
            const { message, order_id } = this.request.all()

            const conversation = await Conversation.findOrCreate({ order_id })
            const conversationConverser = await ConversationConverser.findBy("user_id", id)

            if (conversationConverser) {

                conversationConverser.unread_messages += 1
                conversationConverser.save()

            } else {
                await ConversationConverser.create({
                    conversation_id: conversation.id,
                    user_id: id
                })
            }

            const conversationMessage = new ConversationMessage()
            conversationMessage.conversation_id = conversation.id
            conversationMessage.user_id = id
            conversationMessage.message = message
            await conversationMessage.save()

            return this.response.status(200).send({
                message: "Successfully sent the message",
                status_code: 200,
                results: conversationMessage
            })

        } catch (sendMessageError) {
            console.log("sendMessageError", sendMessageError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        }




    }
}
module.exports = OrderChatFeature