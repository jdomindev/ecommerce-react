const { Schema, model } = require("mongoose");

const paymentSchema = new Schema({
  userId: {
    Type: String
  },
  type: {
    Type: String
  },
  status: {
    Type: String
  },
  card: {
      provider: {
        Type: String
      },
      lastFourNum: {
        Type: Number
      },
      expiryMonth: {
        Type: Number
      },
      expiryYear: {
        Type: Number
      },
      cvvVerified: {
        Type: Boolean
      }
  }
});

const Payment = model("Payment", paymentSchema);

module.exports = Payment;
