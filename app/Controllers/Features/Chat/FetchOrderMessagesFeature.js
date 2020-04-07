"use strict";
const Conversation = use("App/Models/Conversation");

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
