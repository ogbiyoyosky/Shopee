"use strict";
const DeployToProductionFeature = use(
  "App/Controllers/Features/DeployToProductionFeature"
);

class WebhookController {
  async deploy({ request, response }) {
    return new DeployToProductionFeature(request, response).deploy();
  }

  async funding({ request, response }) {
    const { cancelled, resp } = request.all();
    if (cancelled) {
      return response.redirect("http://localhost:3000/funding-success");
    }

    if(resp.data.data.status == "success")
  }
}

module.exports = WebhookController;
