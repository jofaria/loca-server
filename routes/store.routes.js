const express = require("express");
const router = express.Router();
const Store = require("./../models/store.model");
const { isAuthenticated, isOwner } = require("./../middleware/jwt.middleware");
const geocoder = require("./../utils/node-geocoder");
const Owner = require("./../models/owner.model");
// remove middleware and the user variables when testing

router.post("/api/stores", isAuthenticated, async (req, res, next) => {
  try {
    const {
      storeName,
      logoURL,
      storeOwner,
      address,
      // coverImg,
      description,
      website,
      instagram,
    } = req.body;

    console.log("req.body 1", req.body);

    const newStore = await Store.create({
      storeName,
      logo: logoURL,
      storeOwner,
      address,
      // coverImg: coverImg,
      description,
      website,
      instagram,
    });

    console.log("req.body 2", req.body);

    await Owner.findByIdAndUpdate(req.payload._id, {
      $push: { store: newStore._id },
    });

    res.status(201).json(newStore);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/stores", async (req, res, next) => {
  try {
    const allStores = await Store.find().populate("storeOwner");
    console.log(allStores);
    res.status(200).json(allStores);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/stores/:storeId", async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const foundStore = await Store.findById(storeId);
    res.status(200).json(foundStore);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put(
  "/api/stores/:storeId",
  isAuthenticated,
  isOwner,
  async (req, res, next) => {
    try {
      const { storeId } = req.params;

      const {
        storeName,
        logo,
        coverImg,
        location,
        description,
        category,
        website,
        instagram,
      } = req.body;

      const updatedStore = await Store.findByIdAndUpdate(
        storeId,
        {
          storeName,
          logo,
          coverImg,
          location,
          description,
          category,
          website,
          instagram,
        },
        { new: true }
      );

      res.status(201).json(updatedStore);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.delete(
  "/api/stores/:storeId",
  isAuthenticated,
  isOwner,
  async (req, res, next) => {
    try {
      const { storeId } = req.params;
      await Store.findByIdAndRemove(storeId);

      res.status(200).send();
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
