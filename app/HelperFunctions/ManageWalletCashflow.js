'use strict';

const Wallet = use('App/Models/Wallet');
const WalletCashflow = use('App/Models/WalletCashflow');

class ManageWalletCashflow {
  /**
   * Adds a `credit` cashflow entry and credits the wallet if the inflow has been
   * cleared (acknowledged)
   * @param { object } data
   * @param { number } data.wallet_id - The wallet ID
   * @param { number } data.amount - An amount to debit
   * @param { string } [data.description] - A description of the new cashflow
   * @param { boolean } [data.is_cleared] - If true, the cashflow will be cleared instantly.
   * Defaults to true
   * @returns { Promise<object> } a Promise that resolves to the new cashflow.
   */
  static async credit(data, options) {
    const wallet = await ManageWalletCashflow.getWallet(data.wallet_id);
    const cashflow = await ManageWalletCashflow.createCashflow({
      ...data,
      type: 'credit',
    }, options);
    await this.updateWalletBalance(wallet, cashflow, options);
    return wallet;
  }

  /**
   * Adds a `debit` cashflow entry and debits the wallet if the outflow has been
   * cleared (acknowledged)
   * @param { object } data
   * @param { number } data.wallet_id - The wallet ID
   * @param { number } data.amount - An amount to debit
   * @param { string } [data.description] - A description of the new cashflow
   * @param { boolean } [data.is_cleared] - If true, the cashflow will be cleared instantly. Defaults to true
   * @returns { Promise<object> } a Promise that resolves to the new cashflow.
   */
  static async debit(data, options) {
    const wallet = await this.getWallet(data.wallet_id);
    data = { is_cleared: true, ...data, type: 'debit' };
    const cashflow = await ManageWalletCashflow.createCashflow(data, options);
    await ManageWalletCashflow.updateWalletBalance(wallet, cashflow, options);
    return cashflow
  }

  /**
   * Finds and returns a wallet
   * @param { number } id The wallet ID
   * @returns { Promise<object | null> } a Promise that resolves to an object containing the
   * wallet data. If no record is mathed for the given `id`, the Promise resolves to `null`
   */
  static async getWallet(id) {
    const wallet = await Wallet.findBy('id', id);
    if (!wallet) {
      return new Error('Wallet not found');
    }
    return wallet;
  }

  /**
   * Creates a new cashflow record
   * @param { object } data
   * @param { string } data.type - The cashflow type. Either `credit` or `debit`
   * @param { number } data.amount - An amount to debit
   * @param { number } data.wallet_id - The wallet ID
   * @param { boolean } [data.is_cleared] - If true, the cashflow will be cleared instantly.
   * Defaults to false
   * @param { string } [data.description] - A description of the new cashflow. Defaults to null
   * @returns { Promise<object> } a Promise that resolves to the new cashflow.
   */
  static async createCashflow({
    type,
    amount,
    wallet_id,
    is_cleared,
    description,
  }, options) {
    const cashflow = new WalletCashflow();
    cashflow.type = type;
    cashflow.amount = amount;
    cashflow.wallet_id = wallet_id;
    cashflow.is_cleared = is_cleared || false;
    cashflow.description = description || null;
    cashflow.useTransaction(options.transaction);
    await cashflow.save();
    return cashflow;
  }

  /**
   * Updates the wallet balance if the cashflow is cleared
   * @param { object } wallet An instance of the `Wallet` model
   * @param { object } cashflow An instance of the `WalletCashflow` model
   */
  static async updateWalletBalance(wallet, cashflow, options) {
    if (!cashflow.is_cleared) return;

    if (cashflow.type === 'debit') {
      wallet.balance = wallet.balance - cashflow.amount;
    }

    if (cashflow.type === 'credit') {
      wallet.balance = wallet.balance + cashflow.amount;
    }

    wallet.useTransaction(options.transaction);
    await wallet.save();
  }
}

module.exports = ManageWalletCashflow;
