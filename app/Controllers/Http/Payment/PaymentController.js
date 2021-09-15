'use strict'
const InitializePaymentFeature = use('App/Controllers/Features/InitializePaymentFeature')
const VerifyPaymentFeature = use('App/Controllers/Features/VerifyPaymentFeature')
const ProcessTransactionFeature = use('App/Controllers/Features/ProcessTransactionFeature')

class PaymentController {
    async initializePayment ({
        request,
        response,
        auth
    }) {
        return new InitializePaymentFeature(request, response, auth).pay()
    }

    async verifyPayment ({
        request,
        response
    }) {
        return new VerifyPaymentFeature(request, response).verify()
    }

    async processTransaction ({
        request,
        response
    }) {
        return new ProcessTransactionFeature(request, response).processTransaction()
    }

}

module.exports = PaymentController
