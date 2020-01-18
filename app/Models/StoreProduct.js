'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StoreProduct extends Model {
    image() {
        return this.hasOne("App/Models/Image", "image_id", "id")
    }

    mainProductImages() {
        return this.belongsToMany('App/Models/Image',"main_product_id","image_id")
        .pivotTable('store_product_images')
    }

    
}

module.exports = StoreProduct
