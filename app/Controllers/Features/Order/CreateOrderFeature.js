'use strict'
const StoreProduct = use("App/Models/StoreProduct")
const ProductVariant = use("App/Models/ProductVariant")
const Order = use("App/Models/Order")
const OrderProduct = use("App/Models/OrderProduct")

class OrderCreateOrderFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    calculatePrice( price, discount, price_addon) {
        const value = price - ((discount / 100) * price)
		return value + price_addon
    }

    async findStore(product_id) {
       const product =  await StoreProduct.findBy("id", product_id)
       return product.store_id
    }

    async createOrder() {
        try {
            const { cart_items } = this.request.all()
            const userId = this.auth.current.user.id
            
            if (!cart_items ) {
                return this.response.status(400).send({
                    message: "No items in cart",
                    status_code: 400,
                    status: "fail"
                })
            }

            const itemsToBeCalculated = []

            for (var item in cart_items )  {
                const cartProduct = await StoreProduct.findBy('id', cart_items[item].product_id)
                const { price, discount } = cartProduct
                
                const selectedVariantIdInCart =  cart_items[item].variant_id
                const selectedQty =  cart_items[item].qty

                const variant = await ProductVariant.findBy('id', selectedVariantIdInCart)
                const itemPrice = this.calculatePrice( price, discount, variant.price_addon )
                
                itemsToBeCalculated.push({
                    itemPrice,
                    selectedQty
                })
            }

            
            const totalAmount = itemsToBeCalculated.map(item => item.itemPrice * item.selectedQty)
            .reduce(function (accumulator, item) {
                return accumulator + item
            }, 0);
            
            const newOrder = new Order()
            newOrder.user_id = userId
            newOrder.amount = totalAmount
            await newOrder.save()

            for (var item in cart_items )  {

                const storeId = await this.findStore(cart_items[item].product_id)

                const newOrderItem = new OrderProduct()
                newOrderItem.order_id = newOrder.id
                newOrderItem.product_id = cart_items[item].product_id
                newOrderItem.store_id = cart_items[item].store_id
                newOrderItem.variant_id = cart_items[item].variant_id
                newOrderItem.qty = cart_items[item].qty
                newOrderItem.store_id = storeId
                await newOrderItem.save()
                
            }

            return this.response.status(200).send({
                message: "successfully created the order",
                results: {
                    order: newOrder
                }
            })

        } catch (createOrderError) {
           console.log("createOrderError",createOrderError) 
        }
    }

}

module.exports = OrderCreateOrderFeature