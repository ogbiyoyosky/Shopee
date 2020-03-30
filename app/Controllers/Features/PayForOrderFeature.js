'use strict'
const Order = use("App/Models/Order")
const moment = require("moment")

class PayForOrderFeature {
    constructor(request, response, auth) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async payForOrder() {
        try {
            const { order_id } = this.request.all()

            const order = await Order.findBy('Id', order_id)

            if (order) {
                order.is_paid_at = moment().format('YYYY-MM-DD HH:mm:ss')
                await order.save()

                return this.response.status(200).send({
                    message: `Successfully paid for order  ${order.placement_code}`,
                    status_code: 200,
                    status: "success"
                })
            }

            return this.response.status(400).send({
                message: "Order does not exist",
                status_code: 400,
                status: "fail"
            })

        } catch (payForOrderError) {
            console.log("payForOrderError", payForOrderError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        }
    }


}
module.exports = PayForOrderFeature