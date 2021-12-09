const express = require("express");
const router = express.Router();
const Store = require("./../models/store.model");
const { isAuthenticated, isAdmin } = require("./../middleware/jwt.middleware");

router.post("/api/stores", isAuthenticated, async (req, res, next) => {
  try {
    // get the user that is logged in and populate the owner
    const currentUser = req.payload._id;

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

    const newStore = await Store.create({
      storeName,
      storeOwner: currentUser,
      logo,
      coverImg,
      location,
      description,
      category,
      website,
      instagram,
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

router.get("/api/stores/:storeId", isAuthenticated, async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const foundStore = await Store.findById(storeId);
    res.status(200).json(foundStore);
  } catch (error) {}
});

router.put("/api/stores/:storeId", isAuthenticated, async (req, res, next) => {
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
});

router.delete(
  "/api/stores/:storeId",
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
