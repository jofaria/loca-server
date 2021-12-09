const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const storeSchema = new Schema({
  storeName: {
    type: String,
    unique: true,
    required: true,
  },
  storeOwner: { type: Schema.Types.ObjectId, ref: "Owner" },
  logo: { type: String, required: true },
  coverImg: {
    type: String,
    default:
      "https://blog.urbanflowers.com.br/wp-content/uploads/2019/03/282119-o-que-e-slow-fashion-descubra-essa-forma-de-consumo-consciente.jpg",
  },
  location: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
  description: { type: String, required: true },
  category: [
    {
      type: String,
      required: true,
      enum: [
        "Organic materials",
        "Recycled materials",
        "Made locally",
        "Cruelty-free",
        "Ethically-made",
        "Vintage / Second-hand",
      ],
    },
  ],
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  website: String,
  instagram: String,
});

module.exports = model("Store", storeSchema);
