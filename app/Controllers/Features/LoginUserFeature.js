'use strict'
const User = use('App/Models/User')


class LoginUserFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
      }

    async login() {
      try {
        const {
          email,
          password
        } = this.request.all()
       
         const user = await User.query()
           .where('email', email)
           .first()

         let token  
         if (user.is_activated_at != null) {
             token = await this.auth.withRefreshToken()
            .attempt(email, password)

            return this.response.status(200).send({
              message: 'Login Successful',
              status: "Success",
              status_code: 200,
              result: token
            })
         } else {
          return this.response.status(400).send({
            message: 'User was either not found or has been deactivated by the Admin',
            status_code: 400,
            status: 'fail'
          }) 
        }
      } catch (error) {
        console.log('Login Error -> ', error);
        return this.response.status(400).send({
          status: 'fail',
          status_code: 400,
          message: 'Email Or Password Incorrect'
        })
      }
    }

}
module.exports = LoginUserFeature