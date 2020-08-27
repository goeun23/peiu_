const { Nuxt, Builder } = require('nuxt');
var express = require('express');
var https = require('https');
var http = require('http')
var app = express();


var fs = require('fs');

var http_server = http.createServer(app);

var options = {
	key: fs.readFileSync('www_peiu_co_kr_SHA256WITHRSA.key'),
	cert: fs.readFileSync('www_peiu_co_kr.crt'),
};

var https_port = 1001;
var http_port = 30000;

const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)

const builder = new Builder(nuxt);
builder.build();

app.use(nuxt.render);


https.createServer(options, app).listen(https_port, function() {
	console.log("Https server listening on port " + https_port);
});

