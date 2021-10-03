'use strict'

const requestPromise = require("request-promise");
const Env = use('Env');
const User = use('App/Models/User');
const BankDetail = use("App/Models/BankDetail");
const Hash = use('Hash');
const Paystack = use('App/HelperFunctions/Paystack');


class EditBankDetailFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }  

    async editDetail(){
        try {
            const {
                bank_id,
                account_name,
                account_number,
                password
            } = this.request.all();

            if (!password) {
                return this.response.status(400).send({
                    message: "Incorrect password",
                    status: 'fail',
                    status_code: 403,
                }); 
            }

            
            if (!bank_id && !account_name && !account_number) {
                return this.response.status(400).send({
                    message: "No data was provided",
                    status: 'fail',
                    status_code: 400,
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

            if (bank_id) {
                const requestConfig = {
                    method: "POST",
                    uri: 'https://live.moneywaveapi.co/banks',
                    headers: {
                        authorization: `Bearer ${Env.get("FLUTTER_SECRET_KEY")}`,
                        "Content-Type": "application/json",
                        "cache-control": "no-cache",
                    },
                    json: true,
                };
        
                const banksResesponse = await requestPromise(requestConfig);

                if (!banksResesponse.data[bank_id]) {
                    return this.response.status(400).send({
                        message: "The selected bank does not exist. Please check again or contact support.",
                        status: 'fail',
                        status_code: 400,
                    });
                }
            }

            const { user } = this.auth.current;
            const data = {
                account_name,
                account_number,
                bank_id,
                user_id: user.id
            };

            let bankDetail = await BankDetail.findBy('user_id', user.id);
            let transferRecipient;

            if(bankDetail) {
                if (bankDetail.account_number != account_number || bankDetail.bank_id != bank_id) {
                    transferRecipient = await Paystack.createRecipient({
                        "type": "nuban",
                        "name": account_name,
                        "account_number": account_number,
                        "bank_code": bank_id,
                        "currency": "NGN"
                    });

                    console.log({transferRecipient});

                    bankDetail.merge({
                        ...data,
                        recipient_id: transferRecipient.data.recipient_code,
                    });
                }
            } else {
                transferRecipient = await Paystack.createRecipient({
                    "type": "nuban",
                    "name": account_name,
                    "account_number": account_number,
                    "bank_code": bank_id,
                    "currency": "NGN"
                });

                bankDetail = new BankDetail();
                bankDetail.account_name = account_name;
                bankDetail.account_number = account_number;
                bankDetail.bank_id = bank_id;
                bankDetail.user_id = user.id;
                bankDetail.recipient_id = transferRecipient.data.recipient_code;
            }

            await bankDetail.save();

            return this.response.status(200).send({
                message: "Successfully updated your bank detail.",
                status: 'success',
                status_code: 200,
                result: bankDetail
            });        
        } catch (editBankDetailError) {
            console.log("editBankDetailError", editBankDetailError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })

        }
    }
}
module.exports = EditBankDetailFeature