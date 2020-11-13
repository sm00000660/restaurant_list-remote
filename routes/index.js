const express = require("express");
const router = express.Router();

const home = require("./modules/home");
const restaurants = require("./modules/restaurants");
const users = require("./modules/users");
const auth = require("./modules/auth");
const sort = require("./modules/sort");

const { authenticator } = require('../middleware/auth')

router.use("/restaurants", authenticator, restaurants);
router.use("/users", users);
router.use("/auth", auth);
router.use("/sort", authenticator, sort);
router.use("/", authenticator, home);

module.exports = router;
