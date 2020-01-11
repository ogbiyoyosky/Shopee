'use strict'
const Config = use('Config')
const Env = use('Env')
const requestPromise = require("request-promise");
const TransactionToken = use('App/Models/TransactionToken')

class VerifyPaymentFeature {
    constructor (  request, response ) {
        this.request = request
        this.response = response
        
    }

    async verify () {
         const {
             reference
         } = this.request.all()
         console.log(reference)

         const requestConfig = {
           uri: Config.get(
             "endpoints.paystack.verifyTransactionEndpoint"
           ) + "/" + reference,
           headers: {
             authorization: `Bearer ${Env.get('PAYSTACK_SECRET')}`,
             "content-type": "application/json",
             "cache-control": "no-cache"
           },
           json: true, 
         };
     
        
         return requestPromise(requestConfig)
           .then(async apiResponse => {
             if (!apiResponse.status) {
                return this.response.status(400).send({
                    status: "Fail",
                    message: "Error contacting paystack",
                    status_code: 400
                })
             }
     
             const fields = apiResponse.data.metadata.custom_fields;
             let redirectQueryString = [];
     
             fields.forEach((field, i) => {
               redirectQueryString.push(
                 `${field["variable_name"]}=${field["value"]}`
               );
             });
     
             redirectQueryString = encodeURI(redirectQueryString.join("&"));

             let user_id 
             let token 

             let mapData = fields.map((item)=> {
                 if(item.variable_name == 'tkn') {
                    token = item.value
                 }
                 if(item.variable_name == 'uid') {
                    user_id = item.value
                 }
             })
             
           

             const transaction = new TransactionToken()
             transaction.token = token
             transaction.user_id =user_id
             await transaction.save()

     
             const redirectURL = `${Config.get(
               "endpoints.transactions.processTransactionEndpoint"
             )}?${redirectQueryString}`;
            
             return this.response.redirect(redirectURL);
           })
           .catch((e) => 
        {
            console.log("Verify Payment Error", e)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        });
    }

  
}
module.exports = VerifyPaymentFeature