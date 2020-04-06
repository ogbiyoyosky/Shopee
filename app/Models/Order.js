"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
  static get computed() {
    return ["expiring_time"];
  }

  getExpiringTime({ is_paid_at, delivery_time_addon }) {
    const paidAtToMilisecs = new Date(is_paid_at).getTime();
    const DAY_IN_MILISECS = 86400000;
    const getMilisecondsOffset = offset => paidAtToMilisecs + offset;

    const increaseByADay = () =>
      new Date(getMilisecondsOffset(DAY_IN_MILISECS));

    const increaseByTwoDays = () =>
      new Date(getMilisecondsOffset(DAY_IN_MILISECS * 2));

    const handleDefault = () => {
      return increaseByTwoDays();
    };

    let handlers = {
      "24H": increaseByADay(),
      "48H": increaseByTwoDays(),
      "0H": handleDefault()
    };

    return is_paid_at ? handlers[delivery_time_addon] : null;
  }

  order_notification() {
    return this.hasOne("App/Models/OrderNotification", "id", "order_id");
  }
}

module.exports = Order;
