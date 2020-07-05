'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {
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

module.exports = Address
