var http = require("http");
var fs = require("fs");
var querystring = require("querystring");
var url = require("url");



var server = http.createServer((req,res)=>{

	
	var pathname = url.parse(req.url).pathname;
	console.log("Petició per a  " + pathname + " rebuda.");
	if (pathname == '/') {
		
	var html = fs.readFile("./index.html",(err,html)=>{

		
		res.writeHead(200,{"Content-Type" : "text/html; charset=utf-8"})
		res.write(html);
		res.end();
	});
	

	}else if (pathname == '/login') {
		
		var html = fs.readFile("./login.html",(err,html)=>{
	
			
			res.writeHead(200,{"Content-Type" : "text/html; charset=utf-8"})
			res.write(html);
			res.end();
		});
		
	
		}else if (pathname == '/registre') {
		
			var html = fs.readFile("./registre.html",(err,html)=>{
		
				
				res.writeHead(200,{"Content-Type" : "text/html; charset=utf-8"})
				res.write(html);
				res.end();
			});
			
		
			}

});

console.log("Server init");

server.listen(8888);