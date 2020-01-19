'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductVariant extends Model {
    productVariantImages() {
        return this.belongsToMany('App/Models/Image',"product_variant_id","image_id")
        .pivotTable('product_variant_images')
    }
}

module.exports = ProductVariant
