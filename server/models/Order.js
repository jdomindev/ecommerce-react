const { Schema, model } = require("mongoose");
const Product = require('./Product');


const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    }
  ]
},
{ timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;
