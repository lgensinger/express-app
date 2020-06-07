var packageConfig = require("../package.json").config;

import http from "http"
import app from "./app"

// create http server instance
const server = http.createServer(app);

// set app
let currentApp = app

// listen on port defined in package.json
server.listen(packageConfig.port);

// check module status
if (module.hot) {
    
    // hot reload app
    module.hot.accept("./app", () => {
        server.removeListener("request", currentApp)
        server.on("request", app);
        currentApp = app;
    });
    
}