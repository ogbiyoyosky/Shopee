"use strict";
const Store = use("App/Models/Store");
const { uploadImage, uploadBase64 } = use("App/HelperFunctions/UploadImage");
const Image = use("App/Models/Image");
const ProductTag = use("App/Models/ProductTag");
const StoreProduct = use("App/Models/StoreProduct");
const User = use("App/Models/User");
const ProductSize = use("App/Models/ProductSize");
const ProductColor = use("App/Models/ProductColor");
const moment = require("moment");

class AddProductFeature {
  constructor(request, response, auth) {
    this.request = request;
    this.response = response;
    this.auth = auth;
  }

  async processTags({ Submittedtags, productId }) {
    if (Submittedtags) {
      for (var tag in Submittedtags) {
        const productTag = new ProductTag();

        productTag.product_id = productId;
        productTag.tag = Submittedtags[tag];

        await productTag.save();
      }
    }
  }

  async processSizes({ SubmittedSizes, productId }) {
    console.log({ SubmittedSizes });
    if (SubmittedSizes) {
      for (var productSize in SubmittedSizes) {
        const size = new ProductSize();

        size.product_id = productId;
        size.size = SubmittedSizes[productSize];

        await size.save();
      }
    }
  }

  async processColors({ SubmittedColors, productId }) {
    console.log({ SubmittedColors });
    if (SubmittedColors) {
      for (var productColor in SubmittedColors) {
        const color = new ProductColor();

        color.product_id = productId;
        color.color = SubmittedColors[productColor];

        await color.save();
      }
    }
  }

  async addProduct() {
    try {
      const { user } = this.auth.current;
      const userId = user.id;
      const userStore = await Store.findBy("user_id", userId);
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

      console.log({ colors });
      console.log({ sizes });

      if (!userStore || !userStore.is_activated_at) {
        return this.response.status(400).send({
          status: "Fail",
          message: "Store is inactive. Please contact the admin",
          status_code: 400
        });
      }
      let Submittedtags;
      let SubmittedColors;
      let SubmittedSizes;
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
      const multipleProductImages = productImage._files;
      const imageIds = [];

      // Create a store product.
      const product = new StoreProduct();

      product.store_id = userStore.id;
      product.product_name = product_name;
      product.description = description;
      product.price = Math.abs(parseInt(price));
      product.stock = Math.abs(parseInt(stock));
      product.discount = discount;
      product.category_id = category_id;
      product.subcategory_id = subcategory_id;
      product.is_enabled = is_published;

      await product.save();

      if (productImage) {
        let newImage;

        if (!multipleProductImages) {
          const uploadedImage = await uploadImage(productImage);

          // Create a new image instance for single upload.
          newImage = new Image();
          newImage.image_url = uploadedImage.url;
          await newImage.save();

          imageIds.push(newImage.id);
        } else {
          for (var imgKey in multipleProductImages) {
            const uploadedImage = await uploadImage(
              multipleProductImages[imgKey]
            );

            // Create a single image upload instance.
            newImage = new Image();
            newImage.image_url = uploadedImage.url;
            await newImage.save();

            imageIds.push(newImage.id);
          }
        }
      }

      if (tags) {
        await this.processTags({
          Submittedtags,
          productId: product.id
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

      await product.main_product_images().attach(imageIds);

      const userDetail = await User.findBy("id", userId);
      userDetail.last_updated_item = moment().format("YYYY-MM-DD HH:mm:ss");
      await userDetail.save();

      return this.response.status(200).send({
        message: "Product successfully added to store",
        status_code: 200,
        status: "Success",
        product
      });
    } catch (addProductError) {
      console.log("addProductError", addProductError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500
      });
    }
  }
}
module.exports = AddProductFeature;
