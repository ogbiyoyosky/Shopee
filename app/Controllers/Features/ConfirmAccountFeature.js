'use strict'
const User = use('App/Models/User')
const moment = require('moment')


class ConfirmAccountFeature {
  constructor(request, response) {
    this.request = request
    this.response = response
  }

  async confirmUserAccount(confirmation_token) {
    try {
      const user = await User.findBy('confirmation_token', confirmation_token)


      if (!user) return this.response.status(400).send({
        message: "User not found or has already confirmed their email",
        status_code: 400,
        status: "Fail"
      })
      await user.load('user_role')

      user.confirmation_token = null
      user.is_activated_at = moment().format('YYYY-MM-DD HH:mm:ss')
      await user.save()

      return this.response.status(200).send({
        message: "Account successfully confirmed",
        status_code: 200,
        status: 'Success',
        result: user
      })

    } catch (confirmAccountError) {
      console.log("confirmAccountError", confirmAccountError)
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500
      })
    }
  }

}
module.exports = ConfirmAccountFeature