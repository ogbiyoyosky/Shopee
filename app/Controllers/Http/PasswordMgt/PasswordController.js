'use strict'
const SendResetPasswordLinkFeature = use('App/Controllers/Features/SendResetPasswordLinkFeature')

class PasswordController {
    async sendLink ({
        request,
        response
    }) {
        return new SendResetPasswordLinkFeature(request, response).sendLink()
    }
}

module.exports = PasswordController
