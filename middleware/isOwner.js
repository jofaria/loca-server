const jwt = require("express-jwt");
const req = require("express/lib/request");
const Store = require("../models/store.model");

const isOwner = async () => {
  const storeOwner = await Store.find({ storeOwner: req.payload._id });
  if (req.payload._id === Store.storeOwner) {
    next();
  } else {
    console.log("not the owner");
  }
};

module.exports = isOwner;
