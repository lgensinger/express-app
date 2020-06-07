var express = require("express");
var router = express.Router();

var packageConfig = require("../../package.json").config;

module.exports = router;

// HANDLERS
var healthHandler = require("./health/health");

// ROUTE BASE
var baseUrl = packageConfig.base_url + "/health";

// endpoints
router.get(baseUrl, healthHandler);