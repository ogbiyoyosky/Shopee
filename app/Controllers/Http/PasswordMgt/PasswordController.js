'use strict'
const SendResetPasswordLinkFeature = use('App/Controllers/Features/SendResetPasswordLinkFeature')
const ResetForgottenPasswordFeature = use('App/Controllers/Features/ResetForgottenPasswordFeature')

class PasswordController {
    async sendLink ({
        request,
        response
    }) {
        return new SendResetPasswordLinkFeature(request, response).sendLink()
    }

    async resetPassword ({
        request,
        response
    }) {
        return new ResetForgottenPasswordFeature(request, response).resetPassword()
    }
}

module.exports = PasswordController
