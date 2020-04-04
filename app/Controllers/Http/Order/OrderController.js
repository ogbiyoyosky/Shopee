'use strict'
const CreateOrderFeature = use("App/Controllers/Features/Order/CreateOrderFeature")
const FetchSellerOrderNotificationFeature = use("App/Controllers/Features/Notification/FetchSellerOrderNotificationFeature")
const FetchBuyerNotificationFeature = use("App/Controllers/Features/Notification/FetchBuyerNotificationFeature")
const ViewOrderFeature = use("App/Controllers/Features/Order/ViewOrderFeature")
const EditOrderFeature = use("App/Controllers/Features/Order/EditOrderFeature")
const AddShippingCostOnOrderFeature = use("App/Controllers/Features/Order/AddShippingCostOnOrderFeature")
const PayForOrderFeature = use("App/Controllers/Features/PayForOrderFeature")
const Order = use("App/Models/Order")
const moment = require("moment")

class OrderController {
    async createOrder({ request, response, auth }) {
        return new CreateOrderFeature(request, response, auth).createOrder()
    }

    async fetchSellerOrderNotifications({ request, response, auth }) {
        return new FetchSellerOrderNotificationFeature(request, response, auth).fetchSellerOrderNotifications()
    }

    async viewOrder({ request, response, auth, params: { order_id } }) {
        return new ViewOrderFeature(request, response, auth).viewOrder(order_id)
    }

    async editOrder({ request, response, auth, params: { order_id } }) {
        return new EditOrderFeature(request, response, auth).editOrder(order_id)
    }

    async addShippingCost({ request, response, auth, params: { order_id } }) {
        return new AddShippingCostOnOrderFeature(request, response, auth).addShippingCost(order_id)
    }

    async fetchBuyerOrderNotification({ request, response, auth }) {
        return new FetchBuyerNotificationFeature(request, response, auth).fetchBuyerOrderNotification()
    }

    async payForOrder({ request, response, auth }) {
        return new PayForOrderFeature(request, response, auth).payForOrder()
    }

    async delivered({ response, params: { order_id } }) {
        try {
            if (!order_id) {
                return response.status(400).send({
                    message: "please provide the order ID",
                    status: "fail",
                    status_code: 400
                })
            }

            const order = await Order.findBy("id", orderId)

            if (order) {
                order.delivered_at = moment().format('YYYY-MM-DD HH:mm:ss')
                await order.save()

                return response.status(200).send({
                    message: "Order marked as delivered",
                    status: "success",
                    status_code: 200
                })

            }

            return response.status(400).send({
                message: "Order does not exist",
                status: "fail",
                status_code: 400
            })


        } catch (error) {

        }
    }

    async confirmDelivered({ response, params: { order_id } }) {
        try {
            if (!order_id) {
                return response.status(400).send({
                    message: "please provide the order ID",
                    status: "fail",
                    status_code: 400
                })
            }

            const order = await Order.findBy("id", orderId)

            if (order) {

                order.buyer_confirms_delivery_at = moment().format('YYYY-MM-DD HH:mm:ss')
                await order.save()

                return response.status(200).send({
                    message: "Order confirmed as delivered",
                    status: "success",
                    status_code: 200
                })

            }

            return response.status(400).send({
                message: "Order does not exist",
                status: "fail",
                status_code: 400
            })
        } catch (error) {

        }
    }

    async extendTime({ response, request, params: { order_id } }) {
        try {
            const { time } = request.all()
            if (!order_id) {
                return response.status(400).send({
                    message: "please provide the order ID",
                    status: "fail",
                    status_code: 400
                })
            }
            const order = await Order.findBy("id", orderId)

            if (order) {
                if (time == "24H") {
                    order.delivery_time_addon = time
                    await order.save()


                } else if (time == "48H") {
                    order.delivering_time_addon = time
                    await order.save()


                } else {
                    return response.status(400).send({
                        message: "please provide a valid time of 24 Or 48 hours",
                        status: "fail",
                        status_code: 400
                    })
                }

            }

            return response.status(400).send({
                message: "Order does not exist",
                status: "fail",
                status_code: 400
            })

        } catch (error) {

        }
    }


}

module.exports = OrderController
