'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductDetail extends Model {
    variant_value() {
        return  this.hasOne("App/Models/VariantValue","variant_value_id", "id")
    }

    variant_details() {
        return this.hasOne("App/Models/ProductVariant","product_variant_id","id")
    }
}

module.exports = ProductDetail
