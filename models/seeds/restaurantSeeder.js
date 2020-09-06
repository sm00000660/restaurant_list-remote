const mongoose = require("mongoose");
const Restaurant = require("../restaurant");

mongoose.connect("mongodb://localhost/restaurant-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
  for (let i = 0; i < 8; i++) {
    Restaurant.create({ name: `name-${i}` });
  }
  console.log("done");
});
