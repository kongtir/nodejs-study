var express=require('express'),routes=require('./routes'),user=require('./routes/user'),http=require('http'),path=require('path'),fs=require('fs')
    ,favicon = require('serve-favicon'),logger = require('morgan') ,methodOverride = require('method-override')
    ,log4js =require('log4js')
    ,app =express();
//配置log4js http://www.npmjs.com/p?/log4js
log4js.configure({appenders:[{caregory:'console',type:'console'}],replaceConsole:true});//替换控制台
//all environments
app.set('port',process.env.PORT||3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');
app.use(favicon("./favicon.ico"));
app.set(logger('dev'));
app.set(express.json());
app.use(express.urlencoded());
app.use(methodOverride());
app.set(express.cookoeParser('your secret here'));
app.use(express.session());
//无需主动注册路由 app.use(app.router);
app.use(require('less-middleware')(path.join(__dirname,'public')));
app.use(express.static(path.join((__dirname,'public'))));
//development only
if('development'==app.get('env')){
    app.use(express.errorHandler());
}
app.get('/',routes.index);
app.get("/users",user.list);
http.createServer((app).listen(app.get('port')),function () {
    console.log('express server listeng on port'+app.get('port'));
});
