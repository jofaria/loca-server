const express = require("express");
const router = express.Router();
const Owner = require("../models/owner.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

// GET /api/users/current  - Get current user info
router.get("/api/owners/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentOwner = req.payload;
    const owner = await Owner.findById(currentOwner._id);

    res.status(200).json(owner);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/current  - Update the current user
router.put("/api/owners/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentOwner = req.payload;
    const { email, name } = req.body;

    const updatedOwner = await Owner.findByIdAndUpdate(
      currentOwner._id,
      { email, name },
      { new: true }
    );

    res.status(200).json(updatedOwner);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
