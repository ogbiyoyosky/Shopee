'use strict'
const DeployToProductionFeature = use('App/Controllers/Features/DeployToProductionFeature')

class WebhookController {
    async deploy ({
        request,
        response
    }){

        return new DeployToProductionFeature(request,response).deploy()
    }
}

module.exports = WebhookController
