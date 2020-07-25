"use strict";

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const THIRTY_DAY_IN_MILISECONDS = 86400000 * 30;

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  static get computed() {
    return ["is_errant_seller"];
  }

  getIsErrantSeller({ last_login_time, role_id }) {
    if (role_id !== 2 || !last_login_time) return false;

    const cutOffThresholdInMilisecs =
      new Date(last_login_time).getTime() + THIRTY_DAY_IN_MILISECONDS;

    return Date.now() > new Date(cutOffThresholdInMilisecs);
  }

  static get hidden() {
    return ["password", "created_at", "updated_at", "confirmation_token"];
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }

  user_role() {
    return this.hasOne("App/Models/Role", "role_id", "id");
  }

  wallet_balance() {
    return this.belongsTo("App/Models/Wallet", "id", "user_id");
  }

  profile() {
    return this.belongsTo("App/Models/Profile", "id", "user_id");
  }
}

module.exports = User;
