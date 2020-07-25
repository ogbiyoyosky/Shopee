"use strict";
const Config = use("Config");
//const Env = use("Env");
const requestPromise = require("request-promise");
const TransactionToken = use("App/Models/TransactionToken");
const Transaction = use("App/Models/Transaction");
// const ProcessTransactionFeature = use(
//   "App/Controllers/Features/ProcessTransactionFeature"
// );

class VerifyPaymentFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async verify(txRef) {
    const requestConfig = {
      method: "POST",
      uri: Config.get("endpoints.rave.verifyTransactionEndpoint"),
      body: {
        SECKEY: "FLWSECK_TEST-172005f0c04f723fa96ab59c15492a1d-X",
        txref: txRef,
      },
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      json: true,
    };

    return requestPromise(requestConfig)
      .then(async (apiResponse) => {
        if (apiResponse.status == "success") {
          // redirect to a success page
          const fields = JSON.parse(apiResponse.data.meta[0].metavalue);

          let redirectQueryString = [];

          fields.forEach((field, i) => {
            redirectQueryString.push(
              `${field["variable_name"]}=${field["value"]}`
            );
          });

          redirectQueryString = encodeURI(redirectQueryString.join("&"));

          let amount;
          let user_id;
          let token;
          let type;
          let memo;
          let redirectURL;

          let mapData = fields.map((item) => {
            if (item.variable_name == "tkn") {
              token = item.value;
            }
            if (item.variable_name == "uid") {
              user_id = item.value;
            }

            if (item.variable_name == "amt") {
              amount = item.value;
            }

            if (item.variable_name == "type") {
              type = item.value;
            }

            if (item.variable_name == "url") {
              redirectURL = item.value;
            }

            if (item.variable_name == "memo") {
              memo = item.value;
            }
          });

          return {
            user_id,
            amount,
            token,
            type,
            memo,
            redirectURL,
            status: "success",
          };
        } else {
          const transactionToken = await TransactionToken.findBy(
            "token",
            txRef
          );
          if (transactionToken) {
            transactionToken.is_revoked = 1;
            await transactionToken.save();

            transaction = await Transaction.findBY(
              "transaction_reference",
              txRef
            );
            transaction.status = "fail";
            await transaction.save();
          }

          return false;
        }
      })
      .catch((e) => {
        console.log("Verify Payment Error", e);
        return this.response.status(400).send({
          status: "Fail",
          message: "Unable to process transaction.",
          status_code: 400,
        });
      });
  }
}
module.exports = VerifyPaymentFeature;
