'use strict'

class SendLink {
  get rules () {
    return {
      email: 'required|email|unique:users,email'
    }
  }

  get messages () {
    return {
			'email.required': 'Email is required',
			'email.email': 'Please provide a valid email address',
      'email.unique': 'A user with similar email has already registered',
    }
  }
  
  async fails (errorMessages) { 
    return this.ctx.response.status(400).json({
      status: "invalid",
      message: "Invalid data",
      errorMessages: errorMessages[0].message
    })
  }
}

module.exports = SendLink
