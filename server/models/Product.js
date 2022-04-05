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
    type: Number
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
