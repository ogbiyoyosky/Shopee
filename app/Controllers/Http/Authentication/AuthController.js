'use strict'
const RegisterUserFeature = use('App/Controllers/Features/RegisterUserFeature')
const ConfirmAccountFeature = use('App/Controllers/Features/ConfirmAccountFeature')
const LoginUserFeature = use('App/Controllers/Features/LoginUserFeature')
const LogoutUserFeature = use('App/Controllers/Features/LogoutUserFeature')
const GenerateTokenFeature = use('App/Controllers/Features/GenerateTokenFeature')

class AuthController {
    register({
        request,
        response
    }) {
      return new RegisterUserFeature(request,response).registerUser()
    }

    confirmAccount({
        request,
        response,
        params: {
            confirmation_token
        }
    }) {
      return new ConfirmAccountFeature(request,response).confirmUserAccount(confirmation_token)
    }

    loginUser({
        request,
        response,
        auth
    }){
        return new LoginUserFeature(request,response, auth).login()
    }

    logout({
        request,
        response,
        auth
    }){
        return new LogoutUserFeature(request,response, auth).logout()
    }

    generateToken({
        request,
        response,
        auth
    }){
        return new GenerateTokenFeature(request,response, auth).generateToken()
    }
}

module.exports = AuthController
