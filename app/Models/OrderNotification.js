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
        return this.belongsToMany("App/Models/StoreProduct", "order_id", "product_id")
            .pivotTable('order_products')
            .withPivot(['qty'])
    }

    order_address() {
        return this.belongsToMany("App/Models/Address", "address_id", "order_id").pivotTable('order_addresses')
    }
}

module.exports = OrderNotification
