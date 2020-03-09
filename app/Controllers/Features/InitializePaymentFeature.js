'use strict'
const Config = use('Config')
const Env = use('Env')
const TransactionTypeSetting = use('App/Models/TransactionTypeSetting')
const requestPromise = require("request-promise");
const randomString = require('randomstring')



class InitializePaymentFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async pay() {
     try {
      const {
          amount,
          transaction_type_id
        } = this.request.all()

      // const amount = 10
      // const transaction_type_id = 1

      // const uid = 1
      // const email = 'ogbiyoyosky@gmail.com'

      const uid = this.auth.current.user.id
      const email = this.auth.current.user.email
    
      let memo

      const transaction_type = await TransactionTypeSetting.findBy('id',transaction_type_id)

      if (transaction_type.transaction_type_label  == "Deposit") {
          memo = `Funding ${amount} to wallet`
      } else {
          memo = `Paying ${amount}`
      }

       const token = randomString.generate(15)

    
      const requestConfig = {
        method: "POST",
        uri: Config.get("endpoints.paystack.transactionInitializeEndpoint"),
        body: {
          amount: amount * 100,
          email,
          metadata: {
            custom_fields: [
                {
                    display_name: "Amount",
                    variable_name: "amt",
                    value: amount
                },
                {
                    display_name: "User ID",
                    variable_name: "uid",
                    value: uid
                },
                {
                    display_name: "Memo",
                    variable_name: "memo",
                    value: memo
                },
                {
                    display_name: "Type",
                    variable_name: "type",
                    value: transaction_type.transaction_type_label
                },
                {
                    display_name: "Token",
                    variable_name: "tkn",
                    value: token
                }
            ]
          }
        },
        headers: {
          authorization: `Bearer ${Env.get('PAYSTACK_SECRET')}`,
          "content-type": "application/json",
          "cache-control": "no-cache",
        },
        json: true, 
      };
  

      return requestPromise(requestConfig)
      .then(apiResponse => {

        if (!apiResponse.status) {
          return this.response.status(400).send({
            status: "Fail",
            message: "Error contacting paystack",
            status_code: 400
          })
        }
       console.log('redirect url',apiResponse.data.authorization_url)
        return this.response.status(200).send({
          authorization_url: apiResponse.data.authorization_url
        })
      })
      .catch((e) => 
        {
            console.log("initialization Error", e)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        });


      } catch (error) {
        console.log("init payment error", error)
        return this.response.status(500).send({
          status: "Fail",
          message: "Internal Server Error",
          status_code: 500
      })
     }
        
    }

}
module.exports = InitializePaymentFeature