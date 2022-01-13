'use strict';

const ManageWalletCashflow = use('App/HelperFunctions/ManageWalletCashflow');

class ManageWalletCashflowFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async credit(data, options) {
    try {
      const cashflow = await ManageWalletCashflow.credit(data, options);
      return cashflow;
    } catch (manageWalletCashflowFeatureError) {
      console.log(
        'manageWalletCashflowFeatureError',
        manageWalletCashflowFeatureError
      );
      return this.response.status(500).send({
        status: 'Fail',
        message: 'Internal Server Error',
        status_code: 500,
      });
    }
  }

  async debit(data, options) {
    try {
      const cashflow = await ManageWalletCashflow.debit(data, options);
      return cashflow;
    } catch (manageWalletCashflowFeatureError) {
      console.log(
        'manageWalletCashflowFeatureError',
        manageWalletCashflowFeatureError
      );
      return this.response.status(500).send({
        status: 'Fail',
        message: 'Internal Server Error',
        status_code: 500,
      });
    }
  }
}
module.exports = ManageWalletCashflowFeature;
