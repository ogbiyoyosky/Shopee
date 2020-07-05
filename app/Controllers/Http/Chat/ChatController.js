'use strict'
const OrderChatFeature = use("App/Controllers/Features/Chat/OrderChatFeature")
const FetchOrderMessagesFeature = use("App/Controllers/Features/Chat/FetchOrderMessagesFeature")

class ChatController {
    async sendMessage({ request, response, auth }) {
        return new OrderChatFeature(request, response, auth).sendMessage()
    }

    async fetchMessage({ request, response, auth, params: { order_id } }) {
        return new FetchOrderMessagesFeature(request, response, auth).fetchMessage(order_id)
    }
}

module.exports = ChatController
