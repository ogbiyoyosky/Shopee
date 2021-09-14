'use strict';

const Event = use('Event');
const StoreProduct = use('App/Models/StoreProduct');
const Store = use('App/Models/Store');
const Order = use('App/Models/Order');
const Profile = use('App/Models/Profile');
const OrderProduct = use('App/Models/OrderProduct');
const OrderNotification = use('App/Models/OrderNotification');
const Wallet = use('App/Models/Wallet');
const Address = use('App/Models/Address');
const OrderAddress = use('App/Models/OrderAddress');
const Role = use('App/Models/Role');
const randomString = require('randomstring');
const GeneralSetting = use('App/Models/GeneralSetting');
const moment = require('moment');

class OrderCreateOrderFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  calculatePrice(price, discount) {
    const value = price - (discount / 100) * price;
    return value;
  }

  async validBalance(amountOnCart) {
    const userId = this.auth.current.user.id;
    const wallet = await Wallet.findBy('user_id', userId);
    return amountOnCart <= wallet.balance;
  }

  async findStore(product_id) {
    const product = await StoreProduct.findBy('id', product_id);
    return product.store_id;
  }

  async contactSeller(sellerId, orderId) {
    const notification = new OrderNotification();
    notification.seller_id = sellerId;
    notification.buyer_id = this.auth.current.user.id;
    notification.order_id = orderId;
    await notification.save();
  }

  /**
   * Generates a new placement code which is a function of a
   * base placement code plus the last generated placement code
   * plus 1. The resulting number is casted to a string
   *
   * @returns { Promise<string> } a new placement code
   */
  async generatePlacementCode({ userId, totalAmount }) {
    const currentTimestamp = Date.now();
    const placementCodesPerTimestamp = 1000000;
    const baseCode = userId + totalAmount + currentTimestamp;
    const randomFactor = Math.floor(Math.random() * placementCodesPerTimestamp);
    const newPlacementCode = String(baseCode + randomFactor);

    const duplicate = await Order.query()
      .where('placement_code', newPlacementCode)
      .orWhere('placement_code', 'F' + newPlacementCode)
      .orWhere('placement_code', 'Z' + newPlacementCode)
      .fetch();

    if (duplicate.rows.length) {
      return await this.generatePlacementCode({ userId, totalAmount });
    }

    return newPlacementCode;
  }

  async createOrder() {
    try {
      const {
        cart_items,
        billing_address: { province_id, country_id, state_id, address },
      } = this.request.all();

      // console.log(cart_items);
      const userId = this.auth.current.user.id;

      const superAdmin = await Role.findBy('role_label', 'Super Admin');
      const shopAdmin = await Role.findBy('role_label', 'Shop Admin');

      // if (
      //   this.auth.current.user.role_id === superAdmin.id ||
      //   this.auth.current.user.role_id === shopAdmin.id
      // ) {
      //   return this.response.status(400).send({
      //     message:
      //       "You dont have the permission to create an order please create an account as a customer",
      //     status_code: 400,
      //     status: "fail"
      //   });
      // }

      const userProfile = await Profile.findBy('user_id', userId);

      if (!cart_items) {
        return this.response.status(400).send({
          message: 'No items in cart',
          status_code: 400,
          status: 'fail',
        });
      }

      const firstItemOnCartId = cart_items[0].product_id;
      const { store_id } = await StoreProduct.findBy('id', firstItemOnCartId);
      const sellerStore = await Store.findBy('id', store_id);
      const sellerSellOutsideProvince = sellerStore.sell_outside_province;
      const sellerSellOutsideState = sellerStore.sell_outside_state;

      console.log(sellerStore);

      if (userProfile.state_id !== sellerStore.state_id) {
        if (!sellerSellOutsideState) {
          return this.response.status(500).send({
            status: 'Fail',
            message: 'The seller does not sell to your region',
            status_code: 500,
          });
        }
      }

      if (userProfile.province_id !== sellerStore.province_id) {
        if (!sellerSellOutsideProvince) {
          return this.response.status(500).send({
            status: 'Fail',
            message: 'The seller does not sell to your locality',
            status_code: 500,
          });
        }
      }

      const itemsToBeCalculated = [];

      for (var item in cart_items) {
        const cartProduct = await StoreProduct.findBy(
          'id',
          cart_items[item].product_id
        );
        const { price, discount } = cartProduct;

        const selectedQty = cart_items[item].qty;

        const itemPrice = this.calculatePrice(price, discount);

        itemsToBeCalculated.push({
          itemPrice,
          selectedQty,
        });
      }

      const setting = await GeneralSetting.all();
      const serializedSettings = setting.toJSON();

      const totalAmount = itemsToBeCalculated
        .map((item) => item.itemPrice * item.selectedQty)
        .reduce(function (accumulator, item) {
          return accumulator + item;
        }, 0);

      // const vat = totalAmount * (serializedSettings[0].vat / 100); // VAT as initially calculated
      const vat = 0; // Defaults to zero and shall only be included implicitly in the shipping cost
      const serviceCharge = serializedSettings[0].service_charge;
      const token = await this.generatePlacementCode({
        userId,
        totalAmount,
        vat,
      });

      const newOrder = new Order();
      newOrder.user_id = userId;
      newOrder.amount = totalAmount;
      newOrder.vat = vat;

      if (userProfile.province_id == sellerStore.province_id) {
        newOrder.shipping_cost = 0;
        newOrder.seller_accepted_at = moment().format('YYYY-MM-DD HH:mm:ss');
      }
      newOrder.service_charge = serviceCharge;
      newOrder.placement_code = token;
      await newOrder.save();

      for (var item in cart_items) {
        const storeId = await this.findStore(cart_items[item].product_id);

        const newOrderItem = new OrderProduct();
        newOrderItem.order_id = newOrder.id;
        newOrderItem.product_id = cart_items[item].product_id;
        newOrderItem.store_id = cart_items[item].store_id;
        if (cart_items[item].color && cart_items[item].color.length > 0) {
          newOrderItem.color = cart_items[item].color;
        }
        if (cart_items[item].size && cart_items[item].size.length > 0) {
          newOrderItem.size = cart_items[item].size;
        }
        newOrderItem.qty = cart_items[item].qty;
        newOrderItem.store_id = storeId;
        await newOrderItem.save();
      }

      const itemId = cart_items[0].product_id;
      const product = await StoreProduct.findBy('id', itemId);
      const sellerStoreId = product.store_id;

      const seller = await Store.findBy('id', sellerStoreId);
      const sellerId = seller.user_id;

      //save billing address
      const newAddress = await Address.findOrCreate({
        user_id: this.auth.user.id,
        address,
        province_id,
        state_id,
        country_id,
      });

      const orderAddress = new OrderAddress();
      orderAddress.address_id = newAddress.id;
      orderAddress.order_id = newOrder.id;
      await orderAddress.save();

      await this.contactSeller(sellerId, newOrder.id);

      return this.response.status(200).send({
        message: ' A message is sent to the seller',
        status_code: 200,
        results: {
          order: newOrder,
          placement_code: newOrder.placement_code,
        },
      });
    } catch (createOrderError) {
      console.log('createOrderError', createOrderError);
      return this.response.status(500).send({
        status: 'Fail',
        message: 'Internal Server Error',
        status_code: 500,
      });
    }
  }
}

module.exports = OrderCreateOrderFeature;
