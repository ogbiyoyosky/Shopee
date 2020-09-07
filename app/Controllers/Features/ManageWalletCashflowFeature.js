'use strict';

const Wallet = use('App/Models/Wallet');
const WalletCashflow = use('App/Models/WalletCashflow');

class ManageWalletCashflowFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async credit(data) {
    try {
      const wallet = this.getWallet(data.wallet_id);
      const cashflow = await this.createCashflow({ ...data, type: 'credit' });
      await this.updateWalletBalance(wallet, cashflow);
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
      const wallet = this.getWallet(data.wallet_id);
      data = { is_cleared: true, ...data, type: 'debit' };
      const cashflow = await this.createCashflow(data);
      await this.updateWalletBalance(wallet, cashflow);
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

  async getWallet(id) {
    const wallet = Wallet.findBy('id', id);
    if (!wallet) {
      return new Error('Wallet not found');
    }
    return wallet;
  }

  async createCashflow({ type, amount, wallet_id, is_cleared, description }) {
    const cashflow = new WalletCashflow();
    cashflow.type = type;
    cashflow.amount = amount;
    cashflow.wallet_id = wallet_id;
    cashflow.is_cleared = is_cleared || false;
    cashflow.description = description || null;

    await cashflow.save();
    return cashflow;
  }

  /**
   * Updates the wallet balance if the cashflow is cleared
   * @param { object } wallet An instance of the `Wallet` model
   * @param { object } cashflow An instance of the `WalletCashflow` model
   */
  async updateWalletBalance(wallet, cashflow) {
    if (!cashflow.is_cleared) return;

    if (cashflow.type === 'debit') {
      wallet.balance = wallet.balance - cashflow.amount;
    }

    if (cashflow.type === 'credit') {
      wallet.balance = wallet.balance + cashflow.amount;
    }

    wallet.save();
  }
}
module.exports = ManageWalletCashflowFeature;
