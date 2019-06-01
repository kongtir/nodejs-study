var http = require('http');
var url = require('url');
//作为服务器使用
var server = http.createServer(function (request, response) {
    //console.log(request.headers);
    //response.write('<head><meta charset="utf-8"/></head>');
    //response.write("欢迎使用<br>");
   // console.log(request.method);
    var urlObj = url.parse(request.url,true);//将url转换为url对象
    var body=[];
    //处理post数据
    request.on('data',function (data) {
        body.push(data);
    });
    request.on('end',function () {
        body = Buffer.concat(body);
        console.log("body_DATA:"+body.toString());
    });
    response.writeHead(200,{});
    response.write("服务器已接受请求!");
    response.end();
});
server.listen(8080);
console.log("服务器已启动,等待请求.");
