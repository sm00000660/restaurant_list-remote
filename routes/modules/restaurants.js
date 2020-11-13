const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/restaurant");

router.get("/new", (req, res) => {
  return res.render("new");
});

router.post("/", (req, res) => {
  const userId = req.user._id
  const name = req.body.name;
  const name_en = req.body.name_en;
  const category = req.body.category;
  const image = req.body.image;
  const location = req.body.location;
  const phone = req.body.phone;
  const rating = req.body.rating;
  const google_map = req.body.google_map;
  const description = req.body.description;

  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
});

router.get("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id;
  return Restaurant.findOne({ _id, userId})
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error));
});

router.get("/:id/edit", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id;
  return Restaurant.findOne({ _id, userId})
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

router.put("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id;
  const name = req.body.name;
  const name_en = req.body.name_en;
  const category = req.body.category;
  const image = req.body.image;
  const location = req.body.location;
  const phone = req.body.phone;
  const rating = req.body.rating;
  const google_map = req.body.google_map;
  const description = req.body.description;
  return Restaurant.findOne({ _id, userId})
    .then((restaurant) => {
      restaurant.name = name;
      restaurant.name_en = name_en;
      restaurant.category = category;
      restaurant.image = image;
      restaurant.location = location;
      restaurant.phone = phone;
      restaurant.rating = rating;
      restaurant.description = description;
      return restaurant.save();
    })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id;
  return Restaurant.findOne({ _id, userId})
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
