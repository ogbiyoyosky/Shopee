'use strict'
const CreateOrderFeature = use("App/Controllers/Features/Order/CreateOrderFeature")
const FetchSellerOrderNotificationFeature = use("App/Controllers/Features/Notification/FetchSellerOrderNotificationFeature")
const ViewOrderFeature = use("App/Controllers/Features/Order/ViewOrderFeature")
const EditOrderFeature = use("App/Controllers/Features/Order/EditOrderFeature")
const AddShippingCostOnOrderFeature = use("App/Controllers/Features/Order/AddShippingCostOnOrderFeature")

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

    async addShippigCost({ request, response, auth, params: { order_id } }) {
        return new AddShippingCostOnOrderFeature(request, response, auth).addShippigCost(order_id)
    }
}

module.exports = OrderController
