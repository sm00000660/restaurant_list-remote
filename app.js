const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const exphbs = require("express-handlebars");
const restaurantList = require("./models/seeds/restaurant.json");
const bodtParser = require("body-parser");
const methodOverride = require("method-override");

const routes = require("./routes");

const app = express();

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

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(bodtParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(methodOverride("_method"));

app.use(routes);

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
