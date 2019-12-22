'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profile extends Model {
    static boot () {
        super.boot()
          this.addHook('beforeCreate', 'ProfileHook.capitalizeFirstName')
          this.addHook('beforeCreate', 'ProfileHook.capitalizeLastName')
    
      }
}

module.exports = Profile
