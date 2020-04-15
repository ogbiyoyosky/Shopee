"use strict";
const DeployToProductionFeature = use(
  "App/Controllers/Features/DeployToProductionFeature"
);
const ProcessTransactionFeature = use(
  "App/Controllers/Features/ProcessTransactionFeature"
);

class WebhookController {
  async deploy({ request, response }) {
    return new DeployToProductionFeature(request, response).deploy();
  }

  async checkout({ request, response }) {
    const { cancelled, resp } = request.all();

    if (cancelled) {
      return response.redirect("http://timeshoppy.com/dashboard");
    }

    // return new ProcessTransactionFeature(
    //   this.request,
    //   this.response
    // ).processTransaction(amount, token, user_id, type, memo, redirectURL);

    if (resp.data.data.status == "success") {
    }
  }

  async payment({ request }) {
    console.log("req", request.all());
    try {
    } catch (paymentError) {
      console.log("paymentError", paymentError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal server error from payment webhook.",
        status_code: 500,
      });
    }
  }
}

module.exports = WebhookController;
