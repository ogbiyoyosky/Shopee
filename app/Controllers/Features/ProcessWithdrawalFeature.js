'use strict'
const requestPromise = require("request-promise");
const randomString = require("randomstring");
const Config = use("Config");
const Env = use("Env");
const User = use('App/Models/User');
const Wallet = use('App/Models/Wallet');
const BankDetail = use('App/Models/BankDetail');
const Withdrawal = use('App/Models/Withdrawal');
const ManageWalletCashflow = use('App/HelperFunctions/ManageWalletCashflow');
const Paystack = use('App/HelperFunctions/Paystack');


const HOST = Env.get("HOST");
const PORT = Env.get("PORT");
Config.get("endpoints.rave.payoutEndpoint"),

module.exports = class ProcessWithdrawal {
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
                return this.response.status(403).send({
                    message: "Incorrect password",
                    status: 'fail',
                    status_code: 403,
                }); 
            }

            const passwordVerified = await User.comparePassword(this.auth.current.user.id, password);

            if (!passwordVerified) {
                return this.response.status(403).send({
                    message: "Incorrect password",
                    status: 'fail',
                    status_code: 403,
                });  
            }
            
            const bankDetail = await BankDetail.findBy('user_id', this.auth.current.user.id);

            if (!bankDetail || !bankDetail.account_name || !bankDetail.account_number || !bankDetail.bank_id) {
                return this.response.status(400).send({
                    status: 'Fail',
                    status_code: 400,
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

            const token = randomString.generate({
                length: 32,
                capitalization: 'lowercase',
            });

            const response = await this.makeBankTransfer({
                amount: amountToWithdraw,
                recipient_id: bankDetail.recipient_id,
                full_name: bankDetail.account_name,
                reference: token,
            });

            if (response.data.status == "failure") {
                return this.response.status(400).send({
                    status: "Fail",
                    message: "Error contacting rave",
                    status_code: 400,
                    flv_response: response.data,
                });
            }

            const cashflow = await ManageWalletCashflow.debit({
                amount: amountToWithdraw,
                description: 'Withdrawal',
                wallet_id: wallet.id,
            });

            const withdrawal = new Withdrawal();
            withdrawal.wallet_cashflow_id = cashflow.id;
            withdrawal.transaction_id = token;
            await withdrawal.save();

            return this.response.status(200).send({
                status: 'success',
                status_code: 200,
                message: 'Withdrawal successful',
                result: cashflow,
                flw_response: response.data,
            })
        } catch(processWithdrawalError) {
            // console.log('processWithdrawalError -> ', processWithdrawalError);
            let errMsg = processWithdrawalError;
            errMsg = errMsg.data ? errMsg.data.message : "Internal Server Error";
            return this.response.status(500).send({
                status: "Fail",
                message: errMsg,
                status_code: 500
            })
        }
    }

    /**
     * Generates a transaction ID based on the current timestamp and the associated cashflow ID
     * @param { number } token - A random token
     * @returns { string } a unique transaction ID for the withdrawal
     */
    generateTransactionID(token) {
        return `${token}`;
    }

    /**
     * Attempts to make a bank transfer
     */
    async makeBankTransfer ({ amount, reference, recipient_id, full_name }) {
        return Paystack.initiateTransfer({
            amount,
            reference,
            recipient: recipient_id,
            reason: `Transfer to ${full_name}`
        })
    }
}
