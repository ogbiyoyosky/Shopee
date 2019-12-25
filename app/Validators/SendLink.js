'use strict'

class SendLink {
  get rules () {
    return {
      email: 'required|email'
    }
  }

  get messages () {
    return {
			'email.required': 'Email is required',
			'email.email': 'Please provide a valid email address',
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

module.exports = SendLink
