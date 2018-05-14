var http = require("http");
var fs = require("fs");



var servidor = http.createServer((req,res)=>{
	var html = fs.readFile("./index.html",(err,html)=>{
		res.writeHead(200,{"Content-Type": "text/html"})
		res.write(html);
		res.end();
	});
	
});

console.log("Server init");

servidor.listen(8888,"192.168.1.76");