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
    const DAY_IN_MILISECS = 86400000;

    const handleDefault = (offset) =>
      paidAtToMilisecs + offset * ONE_HOUR_MILLISECS;

    return is_paid_at ? handleDefault(delivery_time_addon) : null;
  }

  order_notification() {
    return this.hasOne("App/Models/OrderNotification", "id", "order_id");
  }
}

module.exports = Order;
