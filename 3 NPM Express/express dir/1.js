//使用express 搭建服务器
var express = require('express');
var logger = require('morgan');//需要安装此模块
var http = require('http');
var https = require('https');
var app=express();//后面需要有()

app.use(logger('dev'));//记录日志,以前的写法无效了
app.use(express.static(__dirname+'/static'));//处理静态文件请求
// app.get('/',function (res, req) {
//     req.send("Ho.Nihao.你好真的");   //req.write('This is express Framework!你好');
//    // send 只能有一个,不能和write混用,send不需要end();并且完整支持中文
//     // req.end();
// });
//设置项
app.set('title','标题');
console.log(app.get('title'));
//启用指定的配置
app.enable('trust proxy');
console.log(app.get('trust proxy'));//获取设置项是否被启用
//禁用指定的配置
app.disable('trust proxy');
console.log(app.get('trust proxy'));
//判断设置项是否启用(作为判断使用)
console.log(app.enabled('trust proxy'));
console.log(app.get('env'));//判断是是否开发环境:development
//环境的基本用途
if(app.get('env')=='development'){
    console.log("连接开发数据库");
}else{
    console.log("连接正式数据库");
}
app.use('/',function (req,res,next) {
   //  '/'可以省略,但放在get之后似乎无效
    console.log("=======请求开始=======");
    //res.write("这一步是拦截请求,可以做日志之类的.");
    next();
});
//相应放在最后
app.use(function (req, res, next) {
    res.send('this is a express Server by USE');
    console.log("=======请求完成=======");
});

app.listen(8080);//启动监听_方式1
http.createServer(app).listen(8081); //启动监听_方式2 推荐
//https.createServer(options,app);
console.log("服务器已启动");

