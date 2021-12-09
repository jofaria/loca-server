const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: String,
  price: Number,
  store: { type: Schema.Types.ObjectId, ref: "Store" },
});

module.exports = model("Product", productSchema);
