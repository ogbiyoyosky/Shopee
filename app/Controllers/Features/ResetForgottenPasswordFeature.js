'use strict'
const User = use('App/Models/User')
const PasswordReset = use('App/Models/PasswordReset')



class ResetForgottenPasswordFeature {
    constructor (  request, response  ) {
        this.request = request
        this.response = response
      }

    async resetPassword() {
        try {
            const {
                token,
                password
            } = this.request.all()

            const current_date = Date.now()
              //there is a token that has not expired dont send a mail
            const password_reset_token = await PasswordReset.query()
              .where('token', token)
              .andWhere('expires_at', '>', current_date)
              .first()

              if(password_reset_token) {

                const user = await User.findBy('id', password_reset_token.user_id)
                user.password = password
                await user.save()
                await password_reset_token.delete()

                return this.response.status(200).send({
                  status: "Success",
                  message: `Password changed successfully`,
                  status_code: 200
                })
              } else {
                return this.response.status(400).send({
                  status: "Fail",
                  message: `The password reset token does not exist or has expired.`,
                  status_code: 400
              })
              }
              
               
              
           
    
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
module.exports = ResetForgottenPasswordFeature