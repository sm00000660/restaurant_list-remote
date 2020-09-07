const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const restaurantList = require("./models/seeds/restaurant.json");
const bodtParser = require("body-parser");
const methodOverride = require("method-override");

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(bodtParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const Restaurant = require("./models/restaurant.js");

mongoose.connect("mongodb://localhost/restaurant_list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

app.get("/restaurant/new", (req, res) => {
  return res.render("new");
});

app.post("/restaurant", (req, res) => {
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
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
});

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error));
});

app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

app.put("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const name_en = req.body.name_en;
  const category = req.body.category;
  const image = req.body.image;
  const location = req.body.location;
  const phone = req.body.phone;
  const rating = req.body.rating;
  const google_map = req.body.google_map;
  const description = req.body.description;
  return Restaurant.findById(id)
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

app.delete("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

app.get("/search", (req, res) => {
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

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
