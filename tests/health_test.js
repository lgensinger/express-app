import test from "ava";
import request from "supertest";
import app from "../app/app.js";

var packageConfig = require("../package.json").config;

test("HEALTH:health", async t => {

    // ping endpoint
	const res = await request(app)
		.get(packageConfig.base_url + "/health");
    
    // TEST HEALTH //
	t.is(res.status, 200);
    t.deepEqual(Object.keys(res.body).sort(), [
        "base", 
        "customFromEnv",
        "datastore_online",
        "name", 
        "release", 
        "routes", 
        "status", 
        "uptime", 
        "version"
    ]);
    
});