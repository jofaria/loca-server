const express = require("express");
const router = express.Router();
const Product = require("./../models/product.model");

// POST /api/products
router.post("/api/products", async (req, res, next) => {
  try {
    const currentUserId = req.payload._id;

    const { name, image, description, price } = req.body;

    const newProduct = await Product.create({
      name,
      image,
      description,
      price,
      storeOwner: currentUserId,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET /api/products
router.get("/api/products", async (req, res, next) => {
  try {
    const allProducts = await Product.find().populate("storeOwner");

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET /api/products/:productId
router.get("/api/products/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const foundProduct = await Product.findById(productId);

    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT /api/products/:productId
router.put("/api/products/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;

    const { name, image, description, price } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate({
      name,
      image,
      description,
      price,
    });

    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE /api/stores/:storeId
router.delete("/api/products/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;

    await Product.findByIdAndRemove(productId);
    res.status(200).send();
  } catch (error) {
    res.status(500).json(error);
  }
});
// go to app.js and add this route

// export router
module.exports = router;
