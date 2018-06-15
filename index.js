var http = require("http");
var fs = require("fs");
var querystring = require("querystring");
var url = require("url");
var assert = require('assert'); 
var MongoClient = require('mongodb').MongoClient;

var server = http.createServer((req,res)=>{

	var consulta = url.parse(req.url, true).query;
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
		
			fs.readFile("./registre.html",(err,html)=>{
		
				
				res.writeHead(200,{"Content-Type" : "text/html; charset=utf-8"})
				res.write(html);
				res.end();
			});
			
		
			}else if(pathname== '/loginpost'){
				var ruta = 'mongodb://localhost:27017/othello';

			
				MongoClient.connect(ruta, function (err, db) {
					assert.equal(null, err);
				
	
					res.writeHead(200, {
						"Content-Type": "text/html; charset=utf-8"
					});
					console.log("consulta document a col·lecció usuaris");
	
					var cursor = db.collection('jugadors').find({"nom":consulta.nom});
							cursor.each(function (err, doc) {
								assert.equal(err, null);
								if (doc != null) {
								
								res.write(`Benvingut `+ doc.nom);
								
									res.end();
								}
								else {
								
									console.log("NOT");
									res.end();
								}
							});
						
					
				});
			}
			
			else if (pathname == '/registrepost') {
				var ruta = 'mongodb://localhost:27017/othello';
				console.log(consulta.nom+" "+consulta.password+" "+consulta.password2);
				if(consulta.password===consulta.password2){
					MongoClient.connect(ruta, function (err, db) {
						assert.equal(null, err);
						console.log("Connexió correcta");
						db.collection('jugadors').insertOne({
							"nom": consulta.nom,
							"password":consulta.password,
							"p_guanyades": 0
						});
						assert.equal(err, null);
						console.log("Afegit document a col·lecció jugadors");
						res.write("Registre confirmat");
					res.end();
					});
				}else{
					console.log("Les contrasenyes no coincideixen")
					res.write("Les contrasenyes no coincideixen");
					res.end();
				}
			
			
			
				}else if(pathname== '/consultadades'){
					var ruta = 'mongodb://localhost:27017/othello';
					
					
					MongoClient.connect(ruta, function (err, db) {
						assert.equal(null, err);
						console.log("Connexió correcta");
		
						res.writeHead(200, {
							"Content-Type": "text/html; charset=utf-8"
						});
						if(consulta.busca===""){
							var cursor = db.collection('jugadors').find({});
							cursor.each(function (err, doc) {
								assert.equal(err, null);
								if (doc != null) {
								
								res.write(`<tr>
								<td>`+doc.nom+`</td>
								<td>`+doc.p_guanyades+`</td></tr>`);
								
								
								}
								else {
								
									console.log("NOT");
									res.end();
								}
							});
						}else{
							console.log(consulta.busca);
							var cursor = db.collection('jugadors').find({nom:consulta.busca});
							cursor.each(function (err, doc) {
								assert.equal(err, null);
								if (doc != null) {
								
								res.write(`<tr>
								<td>`+doc.nom+`</td>
								<td>`+doc.p_guanyades+`</td></tr>`);
							
									
								}
								else {
								
									console.log("NOT");
									res.end();
								}
							});
						}
					
					
						
					
					});
				}
			else if (pathname == '/game') {
		
				var html = fs.readFile("./game.html",(err,html)=>{
			
					
					res.writeHead(200,{"Content-Type" : "text/html; charset=utf-8"})
					res.write(html);
					res.end();
				});
				
			
				}	else if (pathname == '/reset.css') {

					res.writeHead(200, {
		
						"Content-Type": "text/html; charset=utf-8"
		
					});
		
		
		
					fs.readFile('./reset.css', function (err, sortida) {
		
						res.writeHead(200, {
		
							'Content-Type': 'text/css'
		
						});
		
		
		
						res.write(sortida);
		
						res.end();
		
					});
		
		
		
				}
				else if (pathname == '/reversi.css') {

					res.writeHead(200, {
		
						"Content-Type": "text/html; charset=utf-8"
		
					});
		
		
		
					fs.readFile('./reversi.css', function (err, sortida) {
		
						res.writeHead(200, {
		
							'Content-Type': 'text/css'
		
						});
		
		
		
						res.write(sortida);
		
						res.end();
		
					});
		
		
		
				}
				else if (pathname == '/reversi.js') {

					res.writeHead(200, {
		
						"Content-Type": "text/html; charset=utf-8"
		
					});
		
		
		
					fs.readFile('./reversi.js', function (err, sortida) {
		
						res.writeHead(200, {
		
							'Content-Type': 'text/css'
		
						});
		
		
		
						res.write(sortida);
		
						res.end();
		
					});
		
		
		
				}



});

console.log("Server init");

server.listen(8888);