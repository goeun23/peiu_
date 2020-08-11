const { Nuxt, Builder } = require('nuxt');
var express = require('express');
var https = require('https');
var http = require('http')
var app = express();

function LeakedObject(){};

app.use('/leak',function(req,res,next){
      for(var i=0;i<1000;i++){
           memoryLeak.push(new LeakedObject());
      }
      res.send('making memory leak. Current memory usage :'
                 +(process.memoryUsage().rss / 1024 / 1024) + 'MB');
});

 

app.use('/heapdump',function(req,res,next){
      var filename = '/Users/terry/heapdump' + Date.now() + '.heapsnapshot';
      heapdump.writeSnapshot(filename);
      res.send('Heapdump has been generated in '+filename);
});



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


//nuxt.ready();
//
const builder = new Builder(nuxt);
builder.build();

app.use(nuxt.render);



app.use('/staticfile', express.static('public'));


https.createServer(options, app).listen(https_port, function() {
	console.log("Https server listening on port " + https_port);
});

