'use strict';
const User = use('App/Models/User');
const Store = use('App/Models/Store');
const StoreProduct = use('App/Models/StoreProduct');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Wallet = use('App/Models/Wallet');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const WalletCashflow = use('App/Models/WalletCashflow');
const ManageWalletCashflow = use('App/HelperFunctions/ManageWalletCashflow');
const moment = require('moment');
const cron = require('node-cron');


class CronJobController {
  async removeProductAfterThirtyDays({ response }) {
    try {
      const allUser = await User.all();
      const serializedUser = allUser.toJSON();

      for (var user in serializedUser) {
        if (serializedUser[user].is_errant_seller) {
          const store = await Store.findBy('user_id', serializedUser[user].id);

          await StoreProduct.query()
            .where('store_id', store.id)
            .update({ is_enabled: 0 });

          const seller = await User.findBy('id', serializedUser[user].id);
          seller.last_login_time = null;
          await seller.save();
        }
      }

      return response.status(200).send({
        status: 'succes',
        message: 'Succeffully removed all in active products',
        status_code: 200,
      });
    } catch (thirtyDaysBanError) {
      console.log('thirtyDaysBanError', thirtyDaysBanError);
      return response.status(500).send({
        status: 'Fail',
        message: 'Internal Server Error',
        status_code: 500,
      });
    }
  }

  async clearInflowsForWithdrawalAfterTwentyFourHours({ response }) {
    try {
      const unclearedInflows = await WalletCashflow.query()
        .where('type', 'credit')
        .andWhere('is_cleared', false)
        .fetch();

      await Promise.all(
        unclearedInflows.rows.map(async (inflow) => {
          const dateRecorded = moment(inflow.created_at);

          if (dateRecorded.add(24, 'hours').isSameOrBefore(moment.now())) {
            const wallet = await Wallet.findBy('id', inflow.wallet_id);

            await WalletCashflow.query()
              .where('id', inflow.id)
              .update({ is_cleared: true });

            await Wallet.query()
              .where('id', inflow.wallet_id)
              .update({ balance: wallet.balance + inflow.amount });
          }
        })
      );

      return response.status(200).send({
        status: 'succes',
        message: 'Succeffully cleared inflows for withdrawal',
        status_code: 200,
      });
    } catch (clearInflowsError) {
      console.log('clearInflowsError', clearInflowsError);
      return response.status(500).send({
        status: 'Fail',
        message: 'Internal Server Error',
        status_code: 500,
      });
    }
  }
}

// to run every 3 minutes, schedule - '00 */3 * * * *'
// Schedule cron job every day at 12am
cron.schedule('00 */1 * * * *', async () => {
  // eslint-disable-next-line no-console
  console.log('Firing reminders');
  try {
    const unclearedInflows = await WalletCashflow.query()
      .where('type', 'credit')
      .andWhere('is_cleared', false)
      .fetch();

    await Promise.all(
      unclearedInflows.rows.map(async (inflow) => {
        const dateRecorded = moment(inflow.created_at);

        if (dateRecorded.add(24, 'hours').isSameOrBefore(moment.now())) {
          const wallet = await Wallet.findBy('id', inflow.wallet_id);

          await WalletCashflow.query()
            .where('id', inflow.id)
            .update({ is_cleared: true });

          await Wallet.query()
            .where('id', inflow.wallet_id)
            .update({ balance: wallet.balance + inflow.amount });
        }
      })
    );
  } catch (clearInflowsError) {
    console.log('clearInflowsError', clearInflowsError);
  }
});

module.exports = CronJobController;
