'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class BankDetail extends Model {
  bank() {
    return this.belongsTo('App/Models/Bank', 'id', 'bank_id');
  }
  user() {
    return this.belongsTo('App/Models/User', 'id', 'user_id');
  }
}

module.exports = BankDetail;
