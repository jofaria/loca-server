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

// add isOwner middleware

router.put(
  "/api/stores/edit/:storeId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { storeId } = req.params;

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

      const updatedStore = await Store.findByIdAndUpdate(
        storeId,
        {
          storeName,
          logo: logoURL,
          storeOwner,
          address,
          // coverImg: coverImg,
          description,
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

// add isOwner middleware

router.delete(
  "/api/stores/delete/:storeId",
  isAuthenticated,
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
