'use strict'
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Wallet = use('App/Models/Wallet')
const Profile = use('App/Models/Profile')
const Env = use('Env')

const Event = use('Event')
const randomString = require('randomstring')


class RegisterUserFeature {
    constructor (  request, response  ) {
        this.request = request
        this.response = response
      }

    async registerUser() {
        try {
            const {
                first_name,
                last_name,
                state_id,
                reg_type_id,
                email,
                gender,
                password,
                country_id,
                province_id,
                phone_number
            } = this.request.all()

            const confirmation_token = randomString.generate(32)
            let role_label 
            role_label = reg_type_id == 2 ? "Shop Admin": "Customer"   
            console.log("role_label", role_label)
            const role =await Role.findBy('role_label', role_label)
            console.log("role", role)

            const user = new User()
            user.email = email
            user.password = password
            user.phone_number = phone_number
            user.confirmation_token = confirmation_token
            user.role_id = role.id
            await user.save()

            //wallet 
            const wallet = new Wallet()
            wallet.user_id = user.id
            await wallet.save()

            //profile
            const profile = new Profile()
            profile.user_id = user.id
            profile.first_name = first_name
            profile.last_name = last_name
            profile.country_id = country_id
            profile.state_id = state_id
            profile.province_id = province_id
            profile.gender = gender
            await profile.save()

            const mailDetails = {
                user,
                profile,
                frontend_url: Env.get('FRONTEND_URL')
              }
              
              if(reg_type_id == 2) {
                Event.fire('new::customer', mailDetails)
              } else {
                Event.fire('new::merchant', mailDetails)
              }
             
            return this.response.status(201).send({
                status: "Success",
                message: "Successfully Registered",
                status_code: 201
            })
    
		} catch (registerUserError) {
            console.log("registerUserError", registerUserError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
		} 
    }

}
module.exports = RegisterUserFeature