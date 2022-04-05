const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
    streetName: {
      type: String,
    },
    aptNo: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    }
});


const Address = model("Address", addressSchema);

module.exports = Address;
