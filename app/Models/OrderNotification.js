'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrderNotification extends Model {
    buyer_details() {
        return this.hasOne("App/Models/User", 'buyer_id', "id")
    }

    seller_details() {
        return this.hasOne("App/Models/User", 'seller_id', "id")
    }

    order_items() {
        return this.belongsToMany("App/Models/StoreProduct").pivotTable('order_products')
    }
}

module.exports = OrderNotification
