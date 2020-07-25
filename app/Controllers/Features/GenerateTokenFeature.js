'use strict'

class GenerateTokenFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth

       
    }

    async generateToken() {
        try {
            const { refreshToken } = this.request.all()
            const token = await this.auth.generateForRefreshToken(refreshToken, true)
            return this.response.status(200).send({
                status: "success",
                message: "Token Refreshed",
                status_code: 200,
                result: token
            })
        } catch(generateTokenError){
        console.log("generateTokenErrror",generateTokenError)
        if (generateTokenError.name === 'InvalidRefreshToken') {
            return this.response.status(401).send({
              status_code: 401,
              status: "InvalidRefreshToken",
              message: "Invalid refresh token please login"
       
            })
        }
        return this.response.status(500).send({
            status: "Fail",
            message: "Internal Server Error",
            status_code: 500
        })
        }
    }

  
}
module.exports = GenerateTokenFeature