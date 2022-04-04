const { Schema, model } = require("mongoose");

const paymentSchema = new Schema({
  userId: {
    type: String
  },
  type: {
    type: String
  },
  status: {
    type: String
  },
  card: {
      provider: {
        type: String
      },
      lastFourNum: {
        type: Number
      },
      expiryMonth: {
        type: Number
      },
      expiryYear: {
        type: Number
      },
      cvvVerified: {
        type: Boolean
      }
  }
});

const Payment = model("Payment", paymentSchema);

module.exports = Payment;
