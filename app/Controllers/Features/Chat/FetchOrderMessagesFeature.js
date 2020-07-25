"use strict";
const Conversation = use("App/Models/Conversation");
const ConversationConverser = use("App/Models/ConversationConverser")

class ChatFetchOrderMessagesFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async fetchMessage(orderId) {
    try {
      const { id } = this.auth.current.user;

      const message = await Conversation.query()
        .where("order_id", orderId)
        .with("conversationMessage.user", builder => {
          builder.with("user_role");
        })
        .fetch();

      const conversationConverser = await ConversationConverser.findBy("user_id", id)

      if (conversationConverser) {

        conversationConverser.unread_messages = 0
        conversationConverser.save()

      }

      return this.response.status(200).send({
        message: "Successfully fetched messages for this order",
        status_code: 200,
        results: message
      });
    } catch (sendMessageError) {
      console.log("sendMessageError", sendMessageError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500
      });
    }
  }
}
module.exports = ChatFetchOrderMessagesFeature;
