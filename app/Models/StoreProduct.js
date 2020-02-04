'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StoreProduct extends Model {
    image() {
        return this.hasOne("App/Models/Image", "image_id", "id")
    }

    main_product_images() {
        return this.belongsToMany('App/Models/Image',"main_product_id","image_id")
        .pivotTable('store_product_images')
    }

    tags() {
        return this.hasMany("App/Models/ProductTag","id","product_id")
    }

    variant() {
        return this.hasMany("App/Models/ProductDetail", "id", "product_id")
    }

    category () {
        return this .hasOne("App/Models/Category","category_id", "id")
    }

    sub_category () {
        return this .hasOne("App/Models/SubCategory","sub_category_id", "id")
    }
    
}

module.exports = StoreProduct
