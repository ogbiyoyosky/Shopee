'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StoreProduct extends Model {
    image() {
        return this.hasOne("App/Models/Image", "image_id", "id")
    }

    
}

module.exports = StoreProduct
