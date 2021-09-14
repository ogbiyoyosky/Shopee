"use strict";
const Config = use("Config");
const Env = use("Env");
const requestPromise = require("request-promise");
const TransactionToken = use("App/Models/TransactionToken");
const Transaction = use("App/Models/Transaction");
const ProcessTransactionFeature = use(
  "App/Controllers/Features/ProcessTransactionFeature"
);

class VerifyPaymentFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async verify() {
    const txRef = this.request.params.reference;
    const transaction = await Transaction.findBy("transaction_reference", txRef);

    if (!transaction) {
      return this.response.status(404).send({
        status: "Fail",
        message: "Transaction not found",
        status_code: 404,
      });
    }

    if (transaction.status !== 'pending') {
      return this.response.status(200).send({
        status: 'success',
        message: 'Query successful',
        status_code: 200,
        result: transaction,
      });
    }

    return requestPromise({
        method: "GET",
        uri: `${Config.get("endpoints.paystack.verifyTransactionEndpoint")}/${txRef}`,
        headers: {
          "authorization": `Bearer ${Env.get("PAYSTACK_SECRET")}`,
          "content-type": "application/json",
          "cache-control": "no-cache",
        },
        json: true,
      })
      .then(async (apiResponse) => { 
        let status = transaction.status;

        console.log(apiResponse);
        
        if (apiResponse.data.status == "success") {
          status = 'success'
          
          if ((apiResponse.data.amount / 100) < transaction.amount) {
            status = 'fail';
          }
        } else if (apiResponse.data.status == 'failed') {
          status = 'fail'
        }

        if (status === 'pending') {
          return this.response.status(200).send({
            status: 'success',
            message: 'Query successful',
            status_code: 200,
            result: transaction,
          });
        }

        const transactionToken = await TransactionToken.findBy("token",txRef);

        if ('success') {
          const transactionType = 'FUNDING';
          await new ProcessTransactionFeature(
            this.request,
            this.response
          ).processTransaction(transaction.amount, transaction.user_id, transactionType);
        }
        
        if (transactionToken && !transactionToken.is_revoked) {
          transactionToken.is_revoked = 1;
          await transactionToken.save();
        }
        
        transaction.status = status;
        await transaction.save();

        return this.response.status(200).send({
          status: 'success',
          message: 'Query successful',
          status_code: 200,
          result: transaction,
        });
      })
      .catch((e) => {
        console.log("Verify Payment Error", e);
        return this.response.status(400).send({
          status: "Fail",
          message: "Unable to verify transaction.",
          status_code: 400,
        });
      });
  }
}
module.exports = VerifyPaymentFeature;
