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
   * @param {userId} userId
   */
  async processTransaction(amount, userId) {
    try {
      let wallet = await Wallet.query().where("user_id", userId).first();

      let balance = Number(wallet.balance) + Number(amount);
      wallet.balance = balance;
      await wallet.save();
    } catch (processTransactionError) {
      console.log("processTransactionError", processTransactionError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500,
      });
    }
  }
}
module.exports = ProcessTransactionFeature;
