"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
  static get computed() {
    return ["expiring_time"];
  }

  getExpiringTime({ is_paid_at, delivery_time_addon }) {
    const paidAtToMilisecs = new Date(is_paid_at).getTime();
    const ONE_HOUR_MILLISECS = 3600000;

    const handleDefault = (offset) => {
      if (is_paid_at) {
        return new Date(paidAtToMilisecs + offset * ONE_HOUR_MILLISECS);
      } else {
        return null;
      }
    };
    return handleDefault(delivery_time_addon);
  }

  order_notification() {
    return this.hasOne("App/Models/OrderNotification", "id", "order_id");
  }
}

module.exports = Order;
