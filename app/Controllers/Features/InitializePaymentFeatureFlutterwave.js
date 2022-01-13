"use strict";
const Config = use("Config");
const Env = use("Env");
const TransactionTypeSetting = use("App/Models/TransactionTypeSetting");
const Profile = use("App/Models/Profile");
const requestPromise = require("request-promise");
const randomString = require("randomstring");
const TransactionToken = use("App/Models/TransactionToken");
const Transaction = use("App/Models/Transaction");

const PUBLICK_KEY = Env.get("FLUTTER_PUBLIC_KEY");
const HOST = Env.get("HOST");
const PORT = Env.get("PORT");

class InitializePaymentFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async pay() {
    try {
      const { amount, transaction_type_id, redirect_url } = this.request.all();

      // const amount = 10;
      // const transaction_type_id = 1;
      // const redirect_url = "funding-success";

      // const uid = 1;
      // const email = "freemanogbiyoyo@gmail.com";
      // const customer_firstname = "Emmanuel";
      // const customer_lastname = "Ogbiyoyo";
      // const phone_number = "08131287472";

      const uid = this.auth.current.user.id;

      const profile = await Profile.findBy("user_id", uid);
      const customer_firstname = profile.first_name;
      const customer_lastname = profile.last_name;
      const email = this.auth.current.user.email;
      const phone_number = `0${this.auth.current.user.phone_number}`;

      let memo;

      const transaction_type = await TransactionTypeSetting.findBy(
        "id",
        transaction_type_id
      );

      if (transaction_type.transaction_type_label == "Deposit") {
        memo = `Funding ${amount} to wallet`;
      } else {
        memo = `Paying ${amount} for order`;
      }

      const token = randomString.generate(15);

      const requestConfig = {
        method: "POST",
        uri: Config.get("endpoints.rave.transactionInitializeEndpoint"),
        body: {
          PBFPubKey: PUBLICK_KEY,
          txref: token,
          customer_phone: phone_number, //phone_number,
          amount: amount, //amount,
          redirect_url: ` https://api.timeshoppy.com/api/v1/verifyPayment`,
          customer_email: email, //email,
          currency: "NGN",
          country: "NG",
          customer_firstname: customer_firstname,
          customer_lastname: customer_lastname,
          custom_title: "Timeshoppy.com",
          custom_description: "Escrow Ecommerce",
          custom_logo: "https://timeshoppy.com/assets/images/icon/logo.jpeg",
          meta: [
            {
              metaname: "custom_fields",
              metavalue: JSON.stringify([
                {
                  display_name: "Amount",
                  variable_name: "amt",
                  value: amount,
                },
                {
                  display_name: "User ID",
                  variable_name: "uid",
                  value: uid,
                },
                {
                  display_name: "Memo",
                  variable_name: "memo",
                  value: memo,
                },
                {
                  display_name: "Type",
                  variable_name: "type",
                  value: transaction_type.transaction_type_label,
                },
                {
                  display_name: "Token",
                  variable_name: "tkn",
                  value: token,
                },
                {
                  display_name: "Url",
                  variable_name: "url",
                  value: redirect_url,
                },
              ]),
            },
          ],
        },
        headers: {
          authorization: `Bearer ${Env.get("PAYSTACK_SECRET")}`,
          "content-type": "application/json",
          "cache-control": "no-cache",
        },
        json: true,
      };

      return requestPromise(requestConfig)
        .then(async (apiResponse) => {
          if (!apiResponse.status == "sucesss") {
            return this.response.status(400).send({
              status: "Fail",
              message: "Error contacting rave",
              status_code: 400,
            });
          }

          //save the transaction and token

          const transaction = new TransactionToken();
          transaction.token = token;
          transaction.user_id = uid;
          await transaction.save();

          await Transaction.create({
            user_id: uid,
            amount,
            status: "pending",
            transaction_reference: token,
            transaction_description: memo,
            transaction_type_id: transaction_type_id,
          });

          return this.response.status(200).send({
            authorization_url: apiResponse.data.link,
          });
        })
        .catch((e) => {
          console.log(e);
          console.log("initialization Error", e);
          return this.response.status(500).send({
            status: "Fail",
            message: "Internal Server Error",
            status_code: 500,
          });
        });
    } catch (error) {
      console.log("init payment error", error);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500,
      });
    }
  }
}
module.exports = InitializePaymentFeature;
