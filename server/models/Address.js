const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
    street: {
      type: String,
    },
    aptNo: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
    country: {
      type: String,
    }
});


const Address = model("Address", addressSchema);

module.exports = Address;
