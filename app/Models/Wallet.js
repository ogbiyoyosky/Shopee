'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Wallet extends Model {
  static get computed() {
    return ['cashflows', 'total_uncleared_inflows', 'ledger_balance'];
  }

  /**
   * Returns the sum of all credit cashflows that have not been cleared
   * for access by the owner of the wallet.
   * @param { object } fields - All fields of the wallet table
   * @param { number } fields.balance - The wallet balance
   * @param { object[] } fields.cashflows - A list of cashflows associated with a wallet
   * @returns { number } The total ucleared credit cashflows
   */
  getTotalUnclearedInflows({ cashflows }) {
    // const sumOfUnclearedWalletInflows = cashflows.reduce(
    //   (accumulator, cashflow) => {
    //     if (cashflow.type === 'credit' && cashflow.is_cleared === false) {
    //       return accumulator + cashflow.amount;
    //     }

    //     return accumulator;
    //   },
    //   0
    // );

    // return sumOfUnclearedWalletInflows;
    return 3;
  }

  /**
   * Calculates the wallet ledger balance based on all inflows and outflows. The return value
   * is the same as the wallet's balance plus any uncleared inflows and minus all outflows.
   * @param { object } fields - All fields of the wallet table
   * @param { object[] } fields.cashflows - A list of cashflows associated with a wallet
   * @returns { number } The calculated amount
   */
  getLedgerBalance({ cashflows }) {
    // const sumOfUnclearedWalletInflows = cashflows.reduce(
    //   (accumulator, cashflow) => {
    //     if (cashflow.type === 'credit') {
    //       return accumulator + cashflow.amount;
    //     }

    //     if (cashflow.type === 'debit') {
    //       return accumulator - cashflow.amount;
    //     }
    //   },
    //   0
    // );

    // return sumOfUnclearedWalletInflows;
    return true
  }

  /**
   *
   * @param { object } fields - All fields of the wallet table
   * @param { object[] } fields.cashflows - A list of cashflows associated with a wallet
   */
  getCashFlows({ cashflows }) {
    return cashflows;
  }

  cashflows() {
    return this.hasMany('App/Models/WalletCashflow', 'id', 'wallet_id');
  }
}

module.exports = Wallet;
