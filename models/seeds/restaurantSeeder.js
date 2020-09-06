const mongoose = require("mongoose");
const Restaurant = require("./restaurant.js");

mongoose.connect("mongodb://localhost/restaurant_list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const restaurantList = require("./restaurant.json");

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  for (let i = 0; i < restaurantList.results.length; i++) {
    Restaurant.create({
      name: `${restaurantList.results[i].name}`,
      name_en: `${restaurantList.results[i].name_en}`,
      category: `${restaurantList.results[i].category}`,
      image: `${restaurantList.results[i].image}`,
      location: `${restaurantList.results[i].location}`,
      phone: `${restaurantList.results[i].phone}`,
      google_map: `${restaurantList.results[i].google_map}`,
      rating: `${restaurantList.results[i].rating}`,
      description: `${restaurantList.results[i].description}`,
    });
  }
  console.log("mongodb connected!");
  console.log("done");
});
