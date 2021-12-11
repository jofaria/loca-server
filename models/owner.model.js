const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ownerSchema = new Schema({
  username: { type: String, unique: true, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  phone: {
    type: Number,
    unique: true,
    required: true,
    min: [6, "must be at least 6 numbers"],
  },
  store: [{ type: Schema.Types.ObjectId, ref: "Store", default: null }],
});

module.exports = model("Owner", ownerSchema);
