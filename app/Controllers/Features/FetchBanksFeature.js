'use strict'

const requestPromise = require("request-promise");
const Bank = use('App/Models/Bank');
const Env = use("Env");

class FetchBanksFeature {
    constructor ( response, auth ) {
        this.response = response;
    }

    async fetchBanks(){
        try {
            // const banks = await Bank.query().fetch();
            const requestConfig = {
                method: "POST",
                uri: 'https://live.moneywaveapi.co/banks',
                headers: {
                    authorization: `Bearer ${Env.get("FLUTTER_SECRET_KEY")}`,
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                },
                json: true,
            };
    
            const res = await requestPromise(requestConfig);

            

            const banks = Object.entries(res.data).map(entry => ({ id: entry[0], name: entry[1] }));

            // const serializedBanks = banks.toJSON();

            return this.response.status(200).send({
                message: "Successfully fetched banks",
                status: 'Success',
                status_code: 200,
                // result: serializedBanks
                result: banks
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