'use strict';
const TransactionToken = use('App/Models/TransactionToken');
const TransactionTypeSetting = use('App/Models/TransactionTypeSetting');
const Wallet = use('App/Models/Wallet');
const Transaction = use('App/Models/Transaction');
const Env = use('Env');
const frontend_url = Env.get('FRONTEND_URL');
const ManageWalletCashflow = use('App/HelperFunctions/ManageWalletCashflow');

class ProcessTransactionFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }
  /**
   *
   * @param {amount} amount
   * @param {userId} userId
   */
  async processTransaction(amount, userId) {
    try {
      let wallet = await Wallet.query().where('user_id', userId).first();
      await ManageWalletCashflow.credit({
        wallet_id: wallet.id,
        amount: amount,
      });
    } catch (processTransactionError) {
      console.log('processTransactionError', processTransactionError);
      return this.response.status(500).send({
        status: 'Fail',
        message: 'Internal Server Error',
        status_code: 500,
      });
    }
  }
}
module.exports = ProcessTransactionFeature;
