'use strict'
const Order = use("App/Models/Order")
const Store = use("App/Models/Store")
const OrderNotification = use("App/Models/OrderNotification")
const moment = require("moment")
const Wallet = use("App/Models/Wallet")
const User = use("App/Models/User")
const Role = use("App/Models/Role")
const Event = use('Event')

class PayForOrderFeature {
    constructor(request, response, auth) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async payForOrder() {
        try {
            const { order_id } = this.request.all()
            const { id } = this.auth.current.user

            const order = await Order.findBy('Id', order_id)



            if (!order.shipping_cost) {
                return this.response.status(400).send({
                    message: "No shipping fee added for this order.",
                    status_code: 400,
                    status: "fail"
                })
            }

            if (order) {

                if (order.is_paid_at) {
                    return this.response.status(400).send({
                        message: "Order already paid by you.",
                        status_code: 400,
                        status: "fail"
                    })
                }
                const { shipping_cost, vat, service_charge } = order

                const amountToBeBilled = order.amount + shipping_cost + vat + service_charge

                const userWallet = await Wallet.findBy("user_id", id)
                if (userWallet.balance < amountToBeBilled) {
                    return this.response.status(400).send({
                        message: "Insufficient balance",
                        status_code: 400,
                        status: "fail"
                    })
                }

                userWallet.balance = userWallet.balance - amountToBeBilled
                await userWallet.save()


                order.is_paid_at = moment().format('YYYY-MM-DD HH:mm:ss')
                await order.save()

                const userRole = await Role.findBy("role_label", "Super Admin")

                const user = await User.findBy("role_id", userRole.id)

                const escrowWallet = await Wallet.findBy("user_id", user.id)

                escrowWallet.balance += amountToBeBilled
                await escrowWallet.save()

                //shop details

                const notification = await OrderNotification.findBy("order_id", order_id)
                const sellerId = notification.buyer_id

                const store = await Store.findBy("user_id", sellerId)

                const orderDetails = await Order.query()
                    .where("id", order_id)
                    .with("order_notification", builder => {
                        builder.with("buyer_details.profile")
                        builder.with("seller_details.profile")
                        builder.with("order_address.country_code")
                        builder.with("order_address.state")
                        builder.with("order_address.province")
                        builder.with("order_items.main_product_images")
                    })
                    .first()

                const serializedOrderDetails = orderDetails.toJSON()

                //order_details

                const mailDetails = {
                    shop: {
                        shop_name: store.store_name
                    },

                    user: {
                        first_name: serializedOrderDetails.order_notification.buyer_details.profile.first_name,
                        last_name: serializedOrderDetails.order_notification.buyer_details.profile.last_name,
                        email: serializedOrderDetails.order_notification.buyer_details.email
                    },

                    date: moment(serializedOrderDetails.is_paid_at).format('MMMM Do YYYY'),

                    order_details: serializedOrderDetails,

                    sub_total: order.amount,

                    shipping_fee: shipping_cost,

                    vat: vat,

                    service_charge: service_charge,

                    total: amountToBeBilled

                }



                Event.fire('new::order', mailDetails)

                return this.response.status(200).send({
                    message: `Successfully paid for order  ${order.placement_code}`,
                    status_code: 200,
                    status: "success"
                })
            }

            //send email

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