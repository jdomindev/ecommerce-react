const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  shippingAddress: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
  billingAddress: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    }
  ],
  amount: {
    type: Number,
  },
  trackingNumber: {
    type: String,
  }
});

const Order = model("Order", orderSchema);

module.exports = Order;
