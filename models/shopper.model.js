const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const shopperSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Store" }],
  cart: [],
});

module.exports = model("Shopper", shopperSchema);
