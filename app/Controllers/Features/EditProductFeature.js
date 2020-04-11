"use strict";
const StoreProduct = use("App/Models/StoreProduct");
const Store = use("App/Models/Store");
const { uploadImage } = use("App/HelperFunctions/UploadImage");
const Image = use("App/Models/Image");
const ProductTag = use("App/Models/ProductTag");
const User = use("App/Models/User");
const moment = require("moment");

class EditProductFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async processTags({ tags, productId }) {
    if (tags) {
      const existingTags = await ProductTag.findBy("product_id", productId);
      await existingTags.delete();
      for (var tag in tags) {
        const productTag = new ProductTag();

        productTag.product_id = productId;
        productTag.tag = tags[tag];

        await productTag.save();
      }
    }
  }

  /**
   *
   * @param {Integer} product_id - id of the product
   * @return {Object} -response -ctx
   */
  async editProduct(productId) {
    try {
      let tags;
      const user = this.auth.current.user;
      const user_id = user.id;
      const user_store = await Store.findBy("user_id", user_id);
      const {
        product_name,
        description,
        stock,
        discount,
        category_id,
        subcategory_id,
        is_published,
        tag,
        price,
      } = this.request.all();

      if (user_store.is_activated_at == null) {
        return this.response.status(400).send({
          status: "Fail",
          message: "Store is inactive please contact the admin",
          status_code: 400,
        });
      }
      if (tag) {
        tags = JSON.parse(tag);
      }
      const productImage = this.request.file("product_image", {
        types: ["image"],
      });

      const product = await StoreProduct.findBy("id", productId);
      product.merge({
        product_name,
        description,
        price: Math.abs(price),
        stock: Math.abs(parseInt(stock)),
        discount,
        category_id,
        subcategory_id,
        is_enabled: is_published,
      });
      await product.save();

      const imagesIds = [];

      if (productImage) {
        const mutipleImage = productImage._files;
        if (!mutipleImage) {
          const uploadedImage = await uploadImage(productImage);
          const newImage = new Image();
          newImage.image_url = uploadedImage.url;
          await newImage.save();
          imagesIds.push(newImage.id);
        } else {
          for (var image in mutipleImage) {
            const uploaded_image = await uploadImage(mutiple_image[image]);
            const newImage = new Image();
            newImage.image_url = uploaded_image.url;
            await newImage.save();
            imagesIds.push(newImage.id);
          }
        }
      }

      if (tag) {
        await this.processTags({
          tags,
          productId,
        });
      }

      //add to pivot table
      await product.main_product_images().sync(imagesIds);
      return this.response.status(200).send({
        message: "Product successfully updated",
        status_code: 200,
        status: "Success",
        product,
      });
    } catch (editProductError) {
      console.log("editProductError", editProductError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500,
      });
    }
  }
}
module.exports = EditProductFeature;
