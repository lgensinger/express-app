var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var moment = require("moment");

// determine uptime start
app.set("appStart", moment().toISOString());

// set up the request body parser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

var routes = "./routes/";

// ROUTES
app.use(require(routes + "health"));

module.exports = app;