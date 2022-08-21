const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
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
  image: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  deptCode: {
    type: String
  },
  type: {
    type: String
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  skuSeq: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  }
});

const Product = model("Product", productSchema);

module.exports = Product;
