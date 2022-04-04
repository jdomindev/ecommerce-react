const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  userId: {
    type: String,
  },
  amount: {
    type: Number,
  },
  trackingNumber: {
    type: String,
  }
});

const Order = model("Order", orderSchema);

module.exports = Order;
