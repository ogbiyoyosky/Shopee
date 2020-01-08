"use strict";

const Env = use("Env");
const isProduction = Env.get("NODE_ENV") === "production";
const HOST_URL = isProduction
  ? "https://api.timeshoppy.com"
  : "http://localhost:3333";

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | App endpoints.
  |--------------------------------------------------------------------------
  |
  */
  app: {
    hostURL: HOST_URL
  },

  /*
  |--------------------------------------------------------------------------
  | Paystack endpoints.
  |--------------------------------------------------------------------------
  |
  */
  paystack: {
    transactionInitializeEndpoint:
      "https://api.paystack.co/transaction/initialize",
    verifyTransactionEndpoint: "https://api.paystack.co/transaction/verify"
  },

  /*
  |--------------------------------------------------------------------------
  | Transaction endpoints.
  |--------------------------------------------------------------------------
  |
  */
  transactions: {
    processTransactionEndpoint: `${HOST_URL}/api/v1/Transaction/ProcessTransaction`
  }
};
