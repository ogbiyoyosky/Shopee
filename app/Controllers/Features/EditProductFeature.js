"use strict";
const StoreProduct = use("App/Models/StoreProduct");
const Store = use("App/Models/Store");
const { uploadImage } = use("App/HelperFunctions/UploadImage");
const Image = use("App/Models/Image");
const ProductTag = use("App/Models/ProductTag");
const ProductSize = use("App/Models/ProductSize");
const ProductColor = use("App/Models/ProductColor");
const User = use("App/Models/User");
const moment = require("moment");

class EditProductFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async processSizes({ SubmittedSizes, productId }) {
    if (SubmittedSizes) {
      const existingSizes = ProductSize.query().where("product_id", productId);
      if (existingSizes != null) {
        await existingSizes.delete();
      }

      for (var productSize in SubmittedSizes) {
        const size = new ProductSize();

        size.product_id = productId;
        size.size = SubmittedSizes[productSize];

        await size.save();
      }
    }
  }

  async processColors({ SubmittedColors, productId }) {
    if (SubmittedColors) {
      const existingColors = ProductColor.query().where(
        "product_id",
        productId
      );
      if (existingColors) {
        await existingColors.delete();
      }

      for (var productColor in SubmittedColors) {
        const color = new ProductColor({
          product_id: productId,
          color: SubmittedColors[productColor]
        });

        await color.save();
      }
    }
  }

  async processTags({ Submittedtags, productId }) {
    if (Submittedtags) {
      const existingTags = ProductTag.query().where("product_id", productId);
      if (existingTags != null) {
        await existingTags.delete();
      }
      for (var tag in Submittedtags) {
        const productTag = new ProductTag();

        productTag.product_id = productId;
        productTag.tag = Submittedtags[tag];

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
      let Submittedtags;
      let SubmittedColors;
      let SubmittedSizes;
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
        tags,
        colors,
        sizes,
        price
      } = this.request.all();

      console.log("color", colors);

      if (user_store.is_activated_at == null) {
        return this.response.status(400).send({
          status: "Fail",
          message: "Store is inactive please contact the admin",
          status_code: 400
        });
      }
      if (tags) {
        typeof tags === "string"
          ? (Submittedtags = [tags])
          : (Submittedtags = tags);
      }

      if (colors) {
        typeof colors === "string"
          ? (SubmittedColors = [colors])
          : (SubmittedColors = colors);
      }

      if (sizes) {
        typeof sizes === "string"
          ? (SubmittedSizes = [sizes])
          : (SubmittedSizes = sizes);
      }
      const productImage = this.request.file("product_image", {
        types: ["image"]
      });

      const product = await StoreProduct.findBy("id", productId);
      product.merge({
        product_name,
        description,
        price,
        stock,
        discount,
        category_id,
        subcategory_id,
        is_enabled: is_published
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

      if (tags) {
        await this.processTags({
          Submittedtags,
          productId
        });
      }

      if (colors) {
        await this.processColors({
          SubmittedColors,
          productId: product.id
        });
      }

      if (sizes) {
        await this.processSizes({
          SubmittedSizes,
          productId: product.id
        });
      }

      //add to pivot table
      if (productImage) {
        await product.main_product_images().sync(imagesIds);
      }

      user.last_updated_item = moment().format("YYYY-MM-DD HH:mm:ss");
      await user.save();

      return this.response.status(200).send({
        message: "Product successfully updated",
        status_code: 200,
        status: "Success",
        product
      });
    } catch (editProductError) {
      console.log("editProductError", editProductError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500
      });
    }
  }
}
module.exports = EditProductFeature;
