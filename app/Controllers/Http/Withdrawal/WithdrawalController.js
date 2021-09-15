'use strict'
const VerifyWithdrawalFeature = use('App/Controllers/Features/VerifyWithdrawalFeature')

class WithdrawalController {
    async verify ({
        request,
        response
       
    }) {
        return new VerifyWithdrawalFeature(request, response).verify();
    }
}

module.exports = WithdrawalController;
