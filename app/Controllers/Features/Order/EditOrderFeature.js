'use strict'

class OrderEditOrderFeature {
    constructor(request, response, auth) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async editOrder(orderId) {
        try {

        } catch (editOrderError) {
            console.log("editOrderError", editOrderError)
        }
    }


}
module.exports = OrderEditOrderFeature