'use strict'

const User = use('App/Models/User');
const Bank = use('App/Models/Bank');
const BankDetail = use("App/Models/BankDetail");

class FetchBankDetailFeature {
    constructor ( response, auth ) {
        this.response = response
        this.auth = auth
    }

    async fetchDetail(){
        try {
            const { user } = this.auth.current;
            const bankDetail = await BankDetail.findBy('user_id', user.id);

            return this.response.status(200).send({
                message: "Successfully fetched bank detail.",
                status: 'Success',
                status_code: 200,
                result: bankDetail || {}
            });        
        } catch (fetchBankDetailError) {
            console.log("fetchBankDetailError", fetchBankDetailError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
            
        }
    }
}
module.exports = FetchBankDetailFeature