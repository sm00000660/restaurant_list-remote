const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/restaurant");

router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

router.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      return restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
      );
    })
    .then((restaurants) => res.render("index", { restaurants, keyword }));
});

module.exports = router;
