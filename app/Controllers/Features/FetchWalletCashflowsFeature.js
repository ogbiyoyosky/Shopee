'use strict'
const Wallet = use('App/Models/Wallet');
const WalletCashflow = use('App/Models/WalletCashflow');

class FetchWalletCashflows {
    constructor (response, auth ) {
        this.response = response;
        this.auth = auth;
    }

    async fetchCashflows() {
        try {
            const wallet = await Wallet.findBy('user_id', this.auth.current.user.id);

            if (!wallet) {
                return this.response.status(200).send({
                    status: 'Fail',
                    status_code: 404,
                    message: 'Wallet not found'
                })
            }

            const cashflows = await WalletCashflow.query()
                .where('wallet_id', wallet.id)
                .fetch();

            const serializedCashflow = cashflows.toJSON();

            return this.response.status(200).send({
                status: 'success',
                status_code: 200,
                message: 'Successfully fetch all wallet transactions',
                result: serializedCashflow
            })
        } catch(fetchCashflowsError) {
            console.log('fetchCashflowsError -> ', fetchCashflowsError);
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        }
    }
}
module.exports = FetchWalletCashflows;