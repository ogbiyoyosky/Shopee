'use strict'

class LogoutUserFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async logout () {
        try {
            const refreshToken = this.request.input('refreshToken');
            if(!refreshToken){
                // You can throw any exception you want here
                return this.response.status(400).send({
                    status : 400,
                    status_code: 400,
                    message : 'please provide your refresh token',
                })
            }
            await this.auth
              .authenticator('jwt')
              .revokeTokens([refreshToken], true)
    
            return this.response.status(200).send({
                status : 200,
                status_code:200,
                message : "Successfully logged"
            })
        } catch(logoutError) {
            console.log('logoutError',logoutError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        }
       
    }

  
}
module.exports = LogoutUserFeature