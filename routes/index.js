const express = require("express");
const router = express.Router();

const home = require("./modules/home");
const restaurants = require("./modules/restaurants");
const users = require("./modules/users");
const sort = require("./modules/sort");

router.use("/", home);
router.use("/restaurants", restaurants);
router.use("/users", users);
router.use("/sort", sort);

module.exports = router;
