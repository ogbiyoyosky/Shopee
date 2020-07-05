'use strict'

class ActivateStore {
  get rules () {
    return {
      is_active: 'required|integer'
    }
  }

  get messages () {
    return {
			'is_active.required': 'is_active status is required as 0 or 1',
			
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

module.exports = ActivateStore
