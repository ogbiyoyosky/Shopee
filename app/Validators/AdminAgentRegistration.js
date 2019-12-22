'use strict'

class AdminAgentRegistration {
  get validateAll() {
    return true
  }

  get rules () {
    return {
      first_name: 'required|string',
      last_name: 'required|string',
			phone_number: 'required|string|unique:users,phone_number',
      email: 'required|email|unique:users,email',
      // identification_number: `string|unique:cooperative_agents,identification_number`,
      // password: 'required',
    }
	}
	
  get messages () {
    return {
      'first_name.required': 'First name is required',
      'last_name.required': 'Last name is required',
			'phone_number.required': 'Phone number is required',
			'phone_number.unique': 'An Agent with similar information has already registered',
			'email.required': 'Email is required',
			'email.email': 'Please provide a valid email address',
      'email.unique': 'An Agent with similar information has already registered',
      // 'password.required': 'Kindly set a password',
      // 'identification_number.unique': 'An Agent with this I.D. Number has already been registered'
    }
	}
	
  async fails (errorMessages) {
    // console.log(errorMessages)
    // if (errorMessages[0].field == 'phone_number' || errorMessages[0].field == 'email' || errorMessages[0].field == 'identification_number') {
    //   const {
    //     email = "",
    //     phone_number = 0,
    //     identification_number = ""
    //   } = this.ctx.request.body

    //   // console.log(this.ctx.request.body);
      
    //   const User = use('App/Models/User')
    //   const CooperativeAgent = use('App/Models/CooperativeAgent')


    //   const existingUser = await User.query()
    //     .where('email', email)
    //     .orWhere('phone_number', phone_number)
    //     .first()

    //   const existingAgent = await CooperativeAgent.query()
    //     .where('email', email)
    //     .orWhere('phone_number', phone_number)
    //     .orWhere('identification_number', identification_number)
    //     .first()
        
    //   return this.ctx.response.status(200).json({
    //     status: "existing data",
    //     message: "Information Already Exist in the Database",
    //     existingData: existingUser ? existingUser : existingAgent
    //   })
    // }
    return this.ctx.response.status(400).json({
      status: "invalid",
      message: "Invalid data",
      errorMessages: errorMessages[0].message
    })
  }
}

module.exports = AdminAgentRegistration