var http=require('http');
var exec = require('child_process').exec;
//定义请求触发时的代码
function onRequest(reqest,response) {
    console.log("Accept a Request");
   // response.header("Content-Type", "text/html; charset=utf-8"); 无效
    //response.writeHeader(200, {'Content-Type' : 'text/html;charset:utf-8'});
    response.write('<head><meta charset="utf-8"/></head>');  //有这个就行,上面哪个看起来可以没有
   // sync();//阻塞方法
    response.write("[0000]");
    async(response);//同步方法
    response.write("[0001]");
    //response.write("You send a request!");
    //response.end();
}
var server = http.createServer(onRequest);
server.listen(8080);
console.log("server start!");
//同步方法==>访问链接后,会依次逐个完成
function sync() {
    var time = new Date().getTime();
    while (new Date().getTime()<time+10000);
}
function async(res) {
    exec('find /',{timeout:1000,maxBuffer:2048},function (err,stdout,stderr) {
        res.write('-------------这里是汉字--------------');
        //res.write("["+err+"]");res.write("["+stdout+"]");        res.write("["+stderr+"]");
        res.write("async mothed!");  res.write('find  Complete!');res.end();
    });
}