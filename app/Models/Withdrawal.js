'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Withdrawal extends Model {
  wallet_cashflow() {
    return this.belongsTo('App/Models/WalletCashflow', 'id', 'wallet_cashflow_id');
  }
}

module.exports = Withdrawal;
