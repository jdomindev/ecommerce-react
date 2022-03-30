const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productName: {
    Type: String,
  },
  price: {
    Type: String,
  },
  description: {
    Type: String,
  },
  sku: {
    Type: String,
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
