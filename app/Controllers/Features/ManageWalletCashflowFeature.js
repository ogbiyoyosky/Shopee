'use strict';

const ManageWalletCashflow = use('App/HelperFunctions/ManageWalletCashflow');

class ManageWalletCashflowFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async credit(data) {
    try {
      await ManageWalletCashflow.credit(data);
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

  async debit(data) {
    try {
      await ManageWalletCashflow.debit(data);
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
