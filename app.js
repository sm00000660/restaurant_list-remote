const express = require("express");
const session = require("express-session")
const exphbs = require("express-handlebars");
const bodtParser = require("body-parser");
const methodOverride = require("method-override");

const restaurantList = require("./models/seeds/restaurant.json");

const routes = require("./routes");
require("./config/mongoose");

const app = express();
const PORT = process.env.PORT || 3000

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodtParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(methodOverride("_method"));

app.use(routes);

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`);
});
