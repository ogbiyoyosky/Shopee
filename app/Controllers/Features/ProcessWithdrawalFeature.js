'use strict'
const User = use('App/Models/User');
const Wallet = use('App/Models/Wallet');
const BankDetail = use('App/Models/BankDetail');
const Withdrawal = use('App/Models/Withdrawal');
const ManageWalletCashflow = use('App/HelperFunctions/ManageWalletCashflow');

class ProcessWithdrawal {
    constructor (request, response, auth ) {
        this.request = request;
        this.response = response;
        this.auth = auth;
    }

    async processWithdrawal() {
        try {
            const { amount, password } = this.request.all();
            const amountToWithdraw = Number(amount);

            if (!password) {
                return this.response.status(400).send({
                    message: "Incorrect password",
                    status: 'fail',
                    status_code: 403,
                }); 
            }

            const passwordVerified = await User.comparePassword(this.auth.current.user.id, password);

            if (!passwordVerified) {
                return this.response.status(400).send({
                    message: "Incorrect password",
                    status: 'fail',
                    status_code: 403,
                });  
            }
            
            const bankDetail = await BankDetail.findBy('user_id', this.auth.current.user.id);

            if (!bankDetail || !bankDetail.account_name || !bankDetail.account_number || !bankDetail.bank_id) {
                return this.response.status(404).send({
                    status: 'Fail',
                    status_code: 404,
                    message: 'Please update your bank detail'
                });
            }

            const wallet = await Wallet.findBy('user_id', this.auth.current.user.id);

            if (!wallet) {
                return this.response.status(404).send({
                    status: 'Fail',
                    status_code: 404,
                    message: 'Wallet not found'
                });
            }

            if (wallet.balance < amountToWithdraw) {
                return this.response.status(400).send({
                    status: 'Fail',
                    status_code: 400,
                    message: 'Insufficient balance'
                });
            }

            const cashflow = await ManageWalletCashflow.debit({
                amount: amountToWithdraw,
                description: 'Withdrawal',
                wallet_id: wallet.id,
            });

            const withdrawal = new Withdrawal();
            withdrawal.wallet_cashflow_id = cashflow.id;
            withdrawal.transaction_id = this.generateTransactionID(cashflow.id);
            await withdrawal.save();

            return this.response.status(200).send({
                status: 'success',
                status_code: 200,
                message: 'Withdrawal successful',
                result: cashflow
            })
        } catch(processWithdrawalError) {
            console.log('processWithdrawalError -> ', processWithdrawalError);
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        }
    }

    /**
     * Generates a transaction ID based on the current timestamp and the associated cashflow ID
     * @param { number } cashflowId - The associated wallet cashflow ID
     * @returns { string } a unique transaction ID for the withdrawal
     */
    generateTransactionID(cashflowId) {
        return `WTH-${Date.now() + cashflowId + 737}`;
    }

}
module.exports = ProcessWithdrawal;