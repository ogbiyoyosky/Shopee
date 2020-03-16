'use strict'
const Database = use("Database")

class OrderViewOrderFeature {
    constructor(request, response, auth) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async viewOrder(orderId) {
        try {
            const orderDetails = await Database.from("orders")
                .select("orders.id", "orders.amount as order_price", "orders.is_paid_at as payment_time", "orders.user_id", "addresses.address as delivery_address", "provinces.id", "states.state_label", "country_codes.name", "orders.shipping_cost", "orders.seller_accepted_at", "orders.seller_declined_at", "orders.buyer_accepted_at", "orders.buyer_declined_at")
                .where("orders.id", orderId)
                .innerJoin("users", "orders.user_id", "users.id")
                .innerJoin("order_addresses", "orders.id", "order_addresses.order_id")
                .innerJoin("addresses", "order_addresses.address_id", "addresses.id")
                .innerJoin("states", "addresses.state_id", "states.id")
                .innerJoin("country_codes", "addresses.country_id", "country_codes.id")
                .innerJoin("provinces", "addresses.province_id", "provinces.id")

            const orderItems = await Database.from("order_products")
                .select("store_products.id", "product_name", "description", "price", "discount", "qty")
                .where("order_id", orderId)
                .innerJoin("store_products", "product_id", "store_products.id")

            const orderItemsResult = orderItems.map(({ id, price, product_name, description, qty, discount }) => ({
                id,
                price: price * (discount / 100),
                product_name,
                description,
                qty
            }))


            const orderDetailsSummary = {
                order_items: orderItemsResult,
                order_details: orderDetails[0]
            }

            return this.response.status(200).send({
                message: "Successfully returned the order details",
                status_code: 200,
                status: "success",
                results: orderDetailsSummary
            })
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