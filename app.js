const express = require("express");

const port = 3000;
const exphbs = require("express-handlebars");
const bodtParser = require("body-parser");
const methodOverride = require("method-override");

const restaurantList = require("./models/seeds/restaurant.json");

const routes = require("./routes");
require("./config/mongoose");

const app = express();

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(bodtParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(methodOverride("_method"));

app.use(routes);

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
