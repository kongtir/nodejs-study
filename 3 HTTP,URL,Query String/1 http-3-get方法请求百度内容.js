var http  = require('http');
http.get("http://www.baidu.com",function (response) {
    var body = [];
    response.on('data',function (data) {
        body.push(data);
    });
    response.on('end',function () {
        body=Buffer.concat(body);
        console.log(body.toString());
    })
})