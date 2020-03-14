'use strict'
const Database = use("Database")

class NotificationFetchSellerOrderNotificationFeature {
    constructor(request, response, auth) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async fetchSellerOrderNotifications() {
        try {
            const userId = this.auth.current.user.id
            const orderNotification = await Database.from("order_notifications")
                .select("buyer_id", "order_id", "orders.amount", "orders.created_at", "order_notifications.is_accepted_at")
                .where("seller_id", userId)
                .innerJoin("users", "order_notifications.buyer_id", "users.id")
                .innerJoin("orders", "order_notifications.order_id", "orders.id")
                .orderBy('orders.created_at', 'desc')

            return this.response.status(200).send({
                message: "Successfully returned all order notifications",
                status_code: 200,
                status: "success",
                results: orderNotification
            })

        } catch (fetchSellerOrderNotificationsError) {
            console.log("fetchSellerOrderNotificationsError", fetchSellerOrderNotificationsError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        }
    }


}
module.exports = NotificationFetchSellerOrderNotificationFeature