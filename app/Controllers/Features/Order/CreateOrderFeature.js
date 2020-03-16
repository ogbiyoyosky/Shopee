'use strict'
const StoreProduct = use("App/Models/StoreProduct")
const Store = use("App/Models/Store")
const Order = use("App/Models/Order")
const OrderProduct = use("App/Models/OrderProduct")
const OrderNotification = use("App/Models/OrderNotification")
const Wallet = use("App/Models/Wallet");
const Address = use("App/Models/Address")
const OrderAddress = use("App/Models/OrderAddress")
const randomString = require('randomstring')
const moment = require("moment")


class OrderCreateOrderFeature {
    constructor(request, response, auth) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    calculatePrice(price, discount) {
        const value = price - ((discount / 100) * price)
        return value
    }


    async validBalance(amountOnCart) {
        const userId = this.auth.current.user.id
        const wallet = await Wallet.findBy("user_id", userId)
        return amountOnCart <= wallet.balance
    }

    async findStore(product_id) {
        const product = await StoreProduct.findBy("id", product_id)
        return product.store_id
    }

    async contactSeller(sellerId, orderId) {
        const notification = new OrderNotification()
        notification.seller_id = sellerId
        notification.buyer_id = this.auth.current.user.id
        notification.order_id = orderId
        await notification.save()
    }

    async createOrder() {
        try {
            const { cart_items, billing_address: { province_id, country_id, state_id, address } } = this.request.all()
            const userId = this.auth.current.user.id

            if (!cart_items) {
                return this.response.status(400).send({
                    message: "No items in cart",
                    status_code: 400,
                    status: "fail"
                })
            }

            const itemsToBeCalculated = []

            for (var item in cart_items) {
                const cartProduct = await StoreProduct.findBy('id', cart_items[item].product_id)
                const { price, discount } = cartProduct

                const selectedQty = cart_items[item].qty

                const itemPrice = this.calculatePrice(price, discount)

                itemsToBeCalculated.push({
                    itemPrice,
                    selectedQty
                })
            }

            const totalAmount = itemsToBeCalculated.map(item => item.itemPrice * item.selectedQty)
                .reduce(function (accumulator, item) {
                    return accumulator + item
                }, 0);

            const token = randomString.generate(15)


            const newOrder = new Order()
            newOrder.user_id = userId
            newOrder.amount = totalAmount
            newOrder.placement_code = token
            await newOrder.save()

            for (var item in cart_items) {

                const storeId = await this.findStore(cart_items[item].product_id)

                const newOrderItem = new OrderProduct()
                newOrderItem.order_id = newOrder.id
                newOrderItem.product_id = cart_items[item].product_id
                newOrderItem.store_id = cart_items[item].store_id
                newOrderItem.qty = cart_items[item].qty
                newOrderItem.store_id = storeId
                await newOrderItem.save()

            }

            const itemId = cart_items[0].product_id
            const product = await StoreProduct.findBy("id", itemId)
            const sellerStoreId = product.store_id

            const seller = await Store.findBy("id", sellerStoreId)
            const sellerId = seller.user_id

            //save billing address
            const newAddress = await Address.findOrCreate({
                user_id: this.auth.user.id,
                address,
                province_id,
                state_id,
                country_id
            })

            const orderAddress = new OrderAddress()
            orderAddress.address_id = newAddress.id
            orderAddress.order_id = newOrder.id
            await orderAddress.save()

            await this.contactSeller(sellerId, newOrder.id)

            return this.response.status(200).send({
                message: " A message is sent to the seller",
                status_code: 200,
                results: {
                    order: newOrder,
                    placement_code: newOrder.placement_code
                }
            })


        } catch (createOrderError) {
            console.log("createOrderError", createOrderError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            });
        }
    }

}

module.exports = OrderCreateOrderFeature