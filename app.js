var express = require("express");
var redis = require('redis');

var creds = null;
var j = 0;

console.log('starting');

var app = express();
creds = JSON.parse(process.env.VCAP_SERVICES)['p-redis'][0].credentials;

console.log(creds);
var client = redis.createClient(creds.port, creds.host, {auth_pass: creds.password});

app.get("/", function(req, res) { 
	var i = client.incr('viewCount', function() {
		client.get('viewCount', function(err, j) {
			res.contentType("text/html");
			res.end('<h1>Instance: ' + 
				process.env.CF_INSTANCE_INDEX + 
				'</br> Count: ' + 
				j.toString() + 
				'</h1>');
		    });
	    });
    });

app.listen(process.env.PORT, "0.0.0.0");
