const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const restaurantList = require("./models/seeds/restaurant.json");

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

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

// app.get("/", (req, res) => {
//   res.render("index", { restaurant: restaurantList.results });
// });

app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

// app.get("/restaurants/:restaurant_id", (req, res) => {
//   const restaurant = restaurantList.results.find(
//     (restaurant) => restaurant.id.toString() === req.params.restaurant_id
//   );
//   res.render("show", { restaurant: restaurant });
// });

// app.get("/search", (req, res) => {
//   const keyword = req.query.keyword;
//   const restaurant = restaurantList.results.filter((restaurant) => {
//     return restaurant.name.toLowerCase().includes(keyword.toLowerCase());
//   });
//   res.render("index", { restaurant: restaurant, keyword: keyword });
// });

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
