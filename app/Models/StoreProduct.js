'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StoreProduct extends Model {

	static get computed() {
		return ['discount']
	}

	getDiscount({ discount, price }) {
		const value = (discount * price) / 100
		return `${value}%`
	}

	image() {
		return this.hasOne("App/Models/Image", "image_id", "id")
	}

	main_product_images() {
		return this.belongsToMany('App/Models/Image', "product_id", "image_id")
			.pivotTable('store_product_images')
	}

	tags() {
		return this.hasMany("App/Models/ProductTag", "id", "product_id")
	}

	category() {
		return this.hasOne("App/Models/Category", "category_id", "id")
	}

	variants() {
		return this.hasMany("App/Models/ProductVariant", "id", "product_id")
	}

	sub_category() {
		return this.hasOne("App/Models/SubCategory", "subcategory_id", "id")
	}

}

module.exports = StoreProduct
