'use strict'

const Env = use('Env')
const isProduction = Env.get('NODE_ENV') === 'production'
// const HOST = Env.get('HOST')
const PORT = 8080 //Env.get('PORT')
const HOST_URL = isProduction ? '' : `http://localhost:${PORT}`

module.exports = {    
    /*
  |--------------------------------------------------------------------------
  | App URL
  |--------------------------------------------------------------------------
  |
  */
  app: {
    url: HOST_URL
  },

}