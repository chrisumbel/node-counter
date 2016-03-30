var http = require('http');
var redis = require('redis');

var creds = null;

creds = JSON.parse(process.env.VCAP_SERVICES)['p-redis'][0].credentials;
var client = redis.createClient(creds.port, creds.host);

console.log('starting');

client.auth(creds.password, function() {
	var server = http.createServer(function(req, res) {
		console.log('viewing count ' + i);

		var i = client.incr('viewCount', function() {
			client.get('viewCount', function(err, i) {
				res.end(i.toString());
			    });
		    });
		

	    });

	server.listen(8080);
  });


