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
const CountryCode = use('App/Models/CountryCode')

// Route.on('/').render('welcome')
Route.get("/", () => {
  return {
    'Shopee': 'Welcome to Shopee Api'
  }
})

Route.post("webhook/deploy", 'Webhook/WebhookController.deploy')

Route.get("/api/v1", () => {
  return {
    'Shopee': 'This is the version 1 of shopee api'
  }
})

Route.group(() => {
  Route.get('/MetaData','Meta/MetaDatumController.showMetadata')
  Route.get('MetaData/States/:country_id', 'Meta/MetaDatumController.fetchState')
  Route.get('MetaData/Provinces/:state_id', 'Meta/MetaDatumController.fetchProvince')
  Route.post('Auth/Register', 'Authentication/AuthController.register').validator('Register')
  Route.get('Auth/Confirm/:confirmation_token',  'Authentication/AuthController.confirmAccount')
  Route.post('Auth/Logout',  'Authentication/AuthController.logout').middleware('auth')
  Route.post('Auth/GenerateToken',  'Authentication/AuthController.generateToken')//.middleware('auth')
  Route.post('Auth/Authenticate',  'Authentication/AuthController.loginUser')
  Route.post('Password/SendPasswordResetLink',  'PasswordMgt/PasswordController.sendLink').validator('SendLink')
  Route.post('Password/PasswordReset',  'PasswordMgt/PasswordController.resetPassword')
  Route.post('Store/CreateStore',  'Store/StoreController.createStore').middleware(['auth','shopAdmin']).validator('Store')
  Route.post('Store/ActivateStore/:store_id',  'Store/StoreController.activateStore').middleware(['auth','superAdmin']).validator('ActivateStore')
  Route.get('Profile/Info', 'Profile/ProfileController.fetchProfile').middleware(['auth'])
  Route.put('EditProfile/Info', 'Profile/ProfileController.editProfile').middleware(['auth']).validator('EditProfile')
}).prefix('api/v1')

