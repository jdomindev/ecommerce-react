const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
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
