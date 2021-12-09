const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("Welcome to Loca's API!");
});

module.exports = router;
