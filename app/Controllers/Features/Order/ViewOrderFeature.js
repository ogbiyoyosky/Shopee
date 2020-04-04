'use strict'
const Database = use("Database")
const Order = use("App/Models/Order")


class OrderViewOrderFeature {
    constructor(request, response, auth) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async viewOrder(orderId) {
        try {
            const order = await Order.findBy("id", orderId)
            let orderDetails
            if (order.is_paid_at) {
                orderDetails = await Order.query()
                    .where("id", orderId)
                    .with("order_notification", builder => {
                        builder.with("buyer_details")
                        builder.with("seller_details")
                        builder.with("order_items")
                    })
                    .fetch()

                return this.response.status(200).send({
                    message: "Successfully returned the order details",
                    status_code: 200,
                    status: "success",
                    results: orderDetailsSummary
                })
            } else {
                orderDetails = await Order.query()
                    .where("id", orderId)
                    .with("order_notification", builder => {
                        builder.with("buyer_details")
                        builder.with("seller_details")
                        builder.with("order_items")
                    })
                    .fetch()

                return this.response.status(200).send({
                    message: "Successfully returned the order details",
                    status_code: 200,
                    status: "success",
                    results: orderDetailsSummary
                })
            }


        } catch (viewOrderError) {
            console.log("viewOrderError", viewOrderError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        }

    }


}
module.exports = OrderViewOrderFeature