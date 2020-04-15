"use strict";
const DeployToProductionFeature = use(
  "App/Controllers/Features/DeployToProductionFeature"
);
const ProcessTransactionFeature = use(
  "App/Controllers/Features/ProcessTransactionFeature"
);
const VerifyPaymentFeature = use(
  "App/Controllers/Features/VerifyPaymentFeature"
);

const TransactionToken = use("App/Models/TransactionToken");
const Transaction = use("App/Models/Transaction");
class WebhookController {
  async deploy({ request, response }) {
    return new DeployToProductionFeature(request, response).deploy();
  }

  async funding({ request, response }) {
    const { cancelled, resp, txref } = request.all();
    const {
      tx: { txRef }
    } = JSON.parse(resp);
    let existingToken;
    let transaction;

    if (cancelled) {
      transaction = await Transaction.findBy("transaction_reference", txref);
      if (transaction) {
        if (transaction.status != "success") {
          transaction.status = "fail";
          await transaction.save();
          existingToken = await TransactionToken.findBy("token", txref);
          existingToken.is_revoked = 1;
          await existingToken.save();
        }
      }

      return response.redirect("https://timeshoppy.com/dashboard");
    }

    const {
      user_id,
      amount,
      redirectURL,
      token
    } = await new VerifyPaymentFeature(request, response).verify(txRef);

    if (token) {
      transaction = await Transaction.findBy("transaction_reference", token);

      if (transaction != "success") {
        transaction.status = "success";
        await transaction.save();

        existingToken = await TransactionToken.findBy("token", token);
        existingToken.is_revoked = 1;
        await existingToken.save();

        await new ProcessTransactionFeature(
          request,
          response
        ).processTransaction(amount, user_id);
      }
      return response.redirect(`https://timeshoppy.com/${redirectURL}`);
    }
    return response.redirect(`https://timeshoppy.com/funding-failure`);
  }

  async getFunding({ request, response }) {
    console.log("funding get callback");
  }

  async payment({ request, response }) {
    try {
      const event = request.input("event.type");
      const { status, txRef } = request.all();

      let transaction;
      let existingToken;

      if (event === "CARD_TRANSACTION") {
        if (status == "successful") {
          const { user_id, amount, token } = await new VerifyPaymentFeature(
            request,
            response
          ).verify(txRef);

          if (token) {
            transaction = await Transaction.findBy(
              "transaction_reference",
              token
            );

            if (transaction != "success") {
              transaction.status = "success";
              await transaction.save();

              existingToken = await TransactionToken.findBy("token", token);
              existingToken.is_revoked = 1;
              await existingToken.save();

              await new ProcessTransactionFeature(
                request,
                response
              ).processTransaction(amount, user_id);
            }
          }
        }
        return response.status(200).send({
          status: "success",
          status_code: 200
        });
      }
    } catch (paymentError) {
      console.log("paymentError", paymentError);
      return response.status(500).send({
        status: "Fail",
        message: "Internal server error from payment webhook.",
        status_code: 500
      });
    }
  }
}

module.exports = WebhookController;
