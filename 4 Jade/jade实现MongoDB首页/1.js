var express = require('express'),http=require('http'),path=require('path'),app=express(),logger=require('morgan'),  favicon = require('serve-favicon')
    ,methodOverride = require('method-override');
//设置环境变量
app.set('port',process.env.PORT||8080);
app.set('views',path.join(__dirname,'views'));//设置视图文件夹
app.set('view engine','jade');//设置模板引擎
//设置中间件
app.use(favicon('./favicon.ico'));
app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride());
//app.use(app.router);//新版本不需要这句According to the migration guide, the need to manually do app.use(app.router) has been removed. Now you can use directly (e.g.):app.get('/' ...); app.post(...);
//设置路由
app.get('/mongo',function (req, res) {
    res.render('mongo.jade',{pretty:true});
});
app.get('/',function(req,res){
   res.redirect("/mongo");
});
app.get('/page1',function (req, res) {
    res.render('page1',{title:'page1_title',divContent:'这是传递的内容'})
})
//启动服务器
http.createServer(app).listen(app.get('port'),function () {
    console.log('服务器已启动,监听端口:%s',app.get('port'));
});