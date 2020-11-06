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
   * Processes (completes) a transaction for each successful payment made
   * through the integrated payment gateway by updating the associated user's
   * wallet and wallet cashflow appropriately. Payments for goods won't have the
   * user's wallet balance updated immediately, but an entry will be made for the
   * payment in the wallet cashflow. A cron job is set to update uncleared payments
   * after 24 hours.
   * 
   * @param { number } amount - The amount involved in the transaction
   * @param { number } userId - A user whose wallet cashflow and wallet balance will be updated
   * @param { string } type - An value indicating the type of transaction - whether it is the
   * funding of the user's wallet or the payment for a product. Possible values are `FUNDING` and
   * `PRODUCT_PAYMENT`
   */
  async processTransaction(amount, userId, type) {
    try {
      let wallet = await Wallet.query().where('user_id', userId).first();
      await ManageWalletCashflow.credit({
        wallet_id: wallet.id,
        amount: amount,
        is_cleared: type === 'FUNDING',
        description: type === 'FUNDING' ? 'Wallet funding' : 'Payment for product(s)'
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
