const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/restaurant");

router.get("/asc", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

router.get("/desc", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: "desc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

router.get("/category", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ category: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

router.get("/rating/asc", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ rating: "desc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

router.get("/rating/desc", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ rating: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

module.exports = router;
