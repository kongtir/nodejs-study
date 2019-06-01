//作为客户端发送数据
var http = require('http');
var request =http.request({host:"localhost",port:8080,path:"/",method:"post"},function (response) {
         //console.log(response);
    console.log("statusCode状态码:%s",response.statusCode);
    var body =[];
    response.on('data',function (data) {
        body.push(data);
    });
    response.on('end',function () {
        body = Buffer.concat(body);
        console.log("来自服务器的消息:%s",body.toString());
    })

});
request.write("Hello!");
request.end();