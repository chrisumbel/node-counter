var express = require("express");
var redis = require('redis');

var creds = null;

console.log('starting');

var app = express();
creds = JSON.parse(process.env.VCAP_SERVICES)['p-redis'][0].credentials;

console.log(creds);
var client = redis.createClient(creds.port, creds.host, {auth_pass: creds.password});

app.get("/", function(req, res) { 
	console.log('viewing count ' + i);

	var i = client.incr('viewCount', function() {
		client.get('viewCount', function(err, i) {
			res.end(i.toString());
		    });
	    });
    });

app.listen(process.env.PORT, "0.0.0.0");
