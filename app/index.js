var packageConfig = require("../package.json").config;
var app = require("./app");

// set up http server instance
// listen on port defined in package.json
var server = app.listen(packageConfig.port, "0.0.0.0", function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("app listening at http://%s:%s", host, port);
    
});

module.exports = app;