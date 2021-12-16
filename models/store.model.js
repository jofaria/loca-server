const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const geocoder = require("../utils/node-geocoder");

const storeSchema = new Schema({
  storeName: {
    type: String,
    unique: true,
    required: true,
  },
  storeOwner: { type: Schema.Types.ObjectId, ref: "Owner", default: null },
  logo: {
    type: String,
    default: "https://www.aquiaolado.pt/Content/img/default-logo.png",
  },
  coverImg: {
    type: String,
    default:
      "https://blog.urbanflowers.com.br/wp-content/uploads/2019/03/282119-o-que-e-slow-fashion-descubra-essa-forma-de-consumo-consciente.jpg",
  },
  address: {
    type: String,
    required: [true, "Please add a complete address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
  },
  description: { type: String, required: true },
  categories: {
    type: String,
    value: {
      organicMaterials: false,
      recycledMaterials: false,
      madeLocally: false,
      madeEthically: false,
      crueltyFree: false,
      secondHand: false,
    },
  },
  website: String,
  instagram: { type: String, default: "https://instagram.com" },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", default: null }],
});

storeSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };

  // this.address = undefined;
  next();
});

module.exports = model("Store", storeSchema);
