const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  skuSeq: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  }
});

const Product = model("Product", productSchema);

module.exports = Product;
