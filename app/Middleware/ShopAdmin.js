'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Store = use('App/Models/Store');

class ShopAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response }, next) {
    // call next to advance the request
    const user_id = auth.current.user.id;
    const stores = await Store.findBy('user_id', user_id);

    console.log('Stores Info ', stores, 'by ', user_id);

    if (stores) {
      await next();
    } else {
      return response.status(401).send({
        status_code: 401,
        status: 'Unauthorize Access',
        message: 'You dont have access to perform this action.',
      });
    }
  }
}

module.exports = ShopAdmin;
