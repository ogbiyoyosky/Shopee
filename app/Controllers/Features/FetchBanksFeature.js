'use strict'

const Bank = use('App/Models/Bank');

class FetchBanksFeature {
    constructor ( response, auth ) {
        this.response = response;
    }

    async fetchBanks(){
        try {
            const banks = await Bank.query().fetch();

            const serializedBanks = banks.toJSON();

            return this.response.status(200).send({
                message: "Successfully fetched banks",
                status: 'Success',
                status_code: 200,
                result: serializedBanks
            });        
        } catch (fetchBanksError) {
            console.log("fetchBanksError", fetchBanksError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        }
    }
}
module.exports = FetchBanksFeature