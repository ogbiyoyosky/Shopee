"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Image extends Model {
  static get hidden() {
    return ["created_at", "updated_at"];
  }

  getImageUrl(imageUrl) {
    const path = imageUrl.split("/");
    const idx = path.indexOf("upload");
    path[idx + 1] = "c_fill,h_350,w_350";

    const newPath = path.join("/");

    return newPath;
  }
}

module.exports = Image;
