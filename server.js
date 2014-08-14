var http = require("http");
var fs = require("fs");
var host = "127.0.0.1";
var port = 1337;

var server = http.createServer( function(req, res){
	console.log("Recived request: " + req.url);
	fs.readFile("./" + req.url, function(error,data){
		if (req.url == "/request") {
			req.on('data', function (chunk) {
				chunk = decodeURIComponent(chunk);
				var links = chunk.split(/&/)[0].split(/=/)[1];
				var images = chunk.split(/&/)[1].split(/second=/)[1].split('+').join(' ');
		        fs.writeFile("pic.txt", links);
		        fs.writeFile("recently.html", images);
		    });
		    
		} else if (req.url == "/"){
			res.writeHead(200, {"Contetn-type":"text/html"});

			fs.readFile('./index.html', function (err, html) {
			    if (err) {
			        throw err; 
			    }
			        res.write(html);  
			        res.end();  
			});
		} else if (error){
			res.writeHead(404, {"Contetn-type":"text/plain"});
			res.end("Sorry the page was not found");
		}
		else {
			res.writeHead(200, {"Contetn-type":"text/html"});
			res.end(data);
		}
	})
});
server.listen(port, host, function(){
	console.log("Listening " + host + ":" + port);
});