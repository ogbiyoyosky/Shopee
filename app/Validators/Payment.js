'use strict'

class Payment {
  get rules () {
    return {
      transaction_type_id: 'required|integer',
      amount: 'required|integer'
    }
  }

  get messages () {
    return {
			'transaction_type_id.required': 'Transactiontype is required',
			'eamount.required': 'Please provide the amount for the transaction',
    }
  }
  
  async fails (errorMessages) { 
    return this.ctx.response.status(400).json({
      status: "invalid",
      message: "Invalid data",
      status_code: 400,
      errorMessages: errorMessages[0].message
    })
  }
}

module.exports = Payment