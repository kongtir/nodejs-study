console.log("sever start");
var http = require("http");
http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    for (var i=0;i<10;i++) {
        response.write(i+"\t");
    }
    response.end();
}).listen(8888);
console.log("sever2 start");
var https = require("http");
http.createServer(function (req,resp) {
    resp.write("Hi,This is 8899");
    resp.end();
}).listen(8899);