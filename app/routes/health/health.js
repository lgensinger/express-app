var express = require("express");
var moment = require("moment");
var router = express.Router();

var packageFile = require("../../../package.json");
var packageConfig = packageFile.config;

var configuration = require("../../configuration");

/**
 * Retrieve health of the service.
 * @summary /health
 * @returns An object with key/value pairs of service metadata.
 */
module.exports = function(req, res, next) {
    
    var status = "fail";
    var statusCode = 503;
    
    // determine uptime
    var uptime = req.app.get("appStart");
    var days = moment().diff(moment(uptime), "days");
    var hours = moment().diff(moment(uptime), "hours");
    var minutes = moment().diff(moment(uptime), "minutes");
    var seconds = moment().diff(moment(uptime), "seconds") - (minutes * 60);
    
    var route, routes = [];

    // extract routes
    req.app._router.stack.forEach(function(d){
        
        // check for routes directly registered on the app
        if (d.route) {
            
            // capture value
            routes.push(d.route);
            
        // registered on middleware router
        } else if (d.name === "router") {
            
            // capture value
            d.handle.stack.forEach(function(handler) {
                
                // stash value
                route = handler.route;
                route && routes.push(route);
                
            });
            
        }
        
    });
    
    // build exposed object
    var result = {
        base: packageConfig.base_url,
        datastore_online: true,
        name: packageFile.name,
        release: packageFile.version,
        routes: routes.map(d => d.path),
        status: "pass",
        uptime: {
            day: days,
            hour: hours,
            message:  days + " days, " + hours + " hours, " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds",
            minute: minutes,
            second: seconds
        },
        version: packageConfig.base_url.split("/")[2],
        customFromEnv: configuration.SOME_VALUE_FROM_ENVIRONMENT
    };

    // expose response to client
    res.status(200).send(result);
                
};