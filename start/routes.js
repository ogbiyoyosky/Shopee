"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Route.on('/').render('welcome')
Route.get("/", () => {
  return {
    'Farmer First': 'Welcome to Shopee Api'
  }
})

Route.group(() => {
  Route.get('/MetaData', 'MetaDataController.showMetadata')
  Route.post('Auth/Register', 'Authentication/AuthController.register').validator('Register')
  Route.get('Auth/Confirm/:confirmation_token',  'Authentication/AuthController.confirmAccount')
  Route.post('Auth/Authenticate',  'Authentication/AuthController.loginUser')
  Route.post('Password/SendPasswordResetLink',  'PasswordMgt/PasswordController.sendLink').validator('SendLink')
  Route.post('Password/PasswordReset',  'PasswordMgt/PasswordController.resetPassword')
}).prefix('api/v1')
