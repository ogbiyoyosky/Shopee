'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profile extends Model {
    static boot () {
        super.boot()
          this.addHook('beforeCreate', 'ProfileHook.capitalizeFirstName')
          this.addHook('beforeCreate', 'ProfileHook.capitalizeLastName')
    
      }

    country_code() {
        return this.belongsTo("App/Models/CountryCode", "country_id", "id")
    }

    state() {
        return this.belongsTo("App/Models/State", "state_id", "id")
    }

    province() {
        return this.belongsTo("App/Models/Province", "province_id", "id")
    }
}

module.exports = Profile
