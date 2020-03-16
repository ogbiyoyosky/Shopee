'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductVariant extends Model {
  product_variant_images() {
    return this.belongsToMany('App/Models/Image', "variant_id", "image_id")
      .pivotTable('product_variant_images')
  }

  static get hidden() {
    return [
      'created_at',
      'updated_at',
    ]
  }
}

module.exports = ProductVariant
