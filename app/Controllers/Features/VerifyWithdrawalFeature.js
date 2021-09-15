"use strict";
const Config = use("Config");
//const Env = use("Env");
const Database = use("Database");
const requestPromise = require("request-promise");
const Withdrawal = use("App/Models/Withdrawal");
const WalletCashflow = use("App/Models/WalletCashflow");
const ManageWalletCashflow = use('App/HelperFunctions/ManageWalletCashflow');

class VerifyWithdrawalFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
    this.body = request.all();
  }

  async verify() {
    try {
      const withdrawal = await Withdrawal.findBy('transaction_id', this.body.transfer.reference);
      
      if (!withdrawal) {
        return this.response.status(404).send({
          status: "Fail",
          message: "Transaction reference not found",
          status_code: 404,
        });
      }

      if (this.body.transfer.status === "SUCCESSFUL") {
        withdrawal.merge({ is_successful: true });
      } else {
        // Do a refund
        const cashflow = await WalletCashflow.findBy('id', withdrawal.wallet_cashflow_id);
        await ManageWalletCashflow.credit({
          amount: cashflow.amount,
          description: `Refund for failed withdrawal (${withdrawal.transaction_id})`,
          wallet_id: cashflow.wallet_id,
          is_cleared: true
        });
        
        withdrawal.merge({ is_successful: false });
      }

      await withdrawal.save();

      return this.response.status(200).send({
        status: "Success",
        message: "Successfully updated withdrawal status",
        status_code: 200,
      });
    } catch (error) {
      console.log("Verify Withdrawal Error", error);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500,
      });
    }
  }
}
module.exports = VerifyWithdrawalFeature;
