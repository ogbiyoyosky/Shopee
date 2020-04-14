"use strict";
const TransactionToken = use("App/Models/TransactionToken");
const TransactionTypeSetting = use("App/Models/TransactionTypeSetting");
const Wallet = use("App/Models/Wallet");
const Transaction = use("App/Models/Transaction");
const Env = use("Env");
const frontend_url = Env.get("FRONTEND_URL");

class ProcessTransactionFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }
  /**
   *
   * @param {amount} amount
   * @param {token} token
   * @param {userId} userId
   * @param {type} type
   * @param {memo} memo
   * @param {redirectUrl} redirectUrl
   */
  async processTransaction(amount, token, userId, type, memo, redirectUrl) {
    try {
      let foundToken = await TransactionToken.query()
        .where("user_id", userId)
        .andWhere("token", token)
        .andWhere("is_revoked", 0)
        .first();

      if (!foundToken) {
        return response.status(401).send({
          status: "fail",
          status_code: 401,
          message: "invalid token"
        });
      }
      const transaction_type = await TransactionTypeSetting.findBy(
        "transaction_type_label",
        type
      );

      foundToken.is_revoked = 1;
      await foundToken.save();

      let wallet = await Wallet.query()
        .where("user_id", userId)
        .first();

      let balance = Number(wallet.balance) + Number(amount);
      wallet.balance = balance;
      await wallet.save();

      await Transaction.create({
        sender_id: userId,
        recipient_id: userId,
        amount,
        status: "success",
        transaction_reference: token,
        transaction_description: memo,
        transaction_type_id: transaction_type.id
      });

      this.response.status(200).send({
        message: "Transaction sucessfully",
        status: "success",
        status_code: 200
      });
    } catch (processTransactionError) {
      console.log("processTransactionError", processTransactionError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500
      });
    }
  }
}
module.exports = ProcessTransactionFeature;
