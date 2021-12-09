const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: String,
  price: Number,
  storeOwner: { type: Schema.Types.ObjectId, ref: "Owner", default: null },
});

module.exports = model("Product", productSchema);
