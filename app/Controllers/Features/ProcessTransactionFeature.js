'use strict'
const TransactionToken = use('App/Models/TransactionToken')
const TransactionTypeSetting = use('App/Models/TransactionTypeSetting')
const Wallet = use('App/Models/Wallet')
const Transaction = use('App/Models/Transaction')
const Env = use('Env')
const frontend_url = Env.get('FRONTEND_URL')



class ProcessTransactionFeature {
    constructor (  request, response) {
        this.request = request
        this.response = response
    }

    async processTransaction() {
         const amount = this.request.input("amt");
         const token = this.request.input("tkn") ? this.request.input("tkn") : "";
         const userID = Number(this.request.input("uid"));
         const type =this.request.input("type");
         const memo = decodeURI(this.request.input("memo"));
    

        let foundToken = await TransactionToken
        .query()
        .where('user_id', userID)
        .andWhere('token', token)
        .andWhere('is_revoked', 0)
        .first();

        if (!foundToken) {
            return response.status(401).send({
               status: 'fail',
               status_code: 401,
               message: "invalid token"
            }); 
        }
        const transaction_type = await TransactionTypeSetting.findBy('transaction_type_label',type)
        
        foundToken.is_revoked = 1
        await foundToken.save()

        let wallet = await Wallet.query()
        .where('user_id', userID)
        .first();

        if (type == 'Deposit') {
            let balance = Number(wallet.balance) + Number(amount);

            wallet.balance = balance
            await wallet.save()
        }

        await Transaction.create({
        sender_id: userID,
        recipient_id: userID,
        amount,
        status: 'success',
        transaction_reference: token,
        transaction_description: memo,
        transaction_type_id: transaction_type.id
        });

        //if payment for an order 

        //notify seller about the order.

        return this.response.redirect(`${frontend_url}/success_payment`)
    }
  
}
module.exports = ProcessTransactionFeature