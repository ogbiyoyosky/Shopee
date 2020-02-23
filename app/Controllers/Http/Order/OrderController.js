'use strict'
const CreateOrderFeature = use("App/Controllers/Features/Order/CreateOrderFeature")

class OrderController {
    async createOrder ({ request, response, auth }) {
        return new CreateOrderFeature(request,response, auth).createOrder()
    }
}

module.exports = OrderController
