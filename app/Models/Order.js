'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {

    static get computed() {
        return ['expiring_time']
    }

    getExpiringTime({ is_paid_at, delivery_time_addon }) {
        if (is_paid_at) {
            if (delivery_time_addon == "24H") {
                const paidTime = is_paid_at.getTime()
                const extendedTime = 24 * 3600000
                return new Date(extendedTime + paidTime)

            } else if (delivery_time_addon == "24H") {
                const paidTime = is_paid_at.getTime()
                const extendedTime = 48 * 3600000
                return new Date(extendedTime + paidTime)

            } else {
                const paidTime = is_paid_at.getTime()
                const extendedTime = 0
                return new Date(extendedTime + paidTime)
            }

        } else {
            return null
        }

    }

    order_notification() {
        return this.hasOne("App/Models/OrderNotification", 'id', 'order_id')
    }
}

module.exports = Order
