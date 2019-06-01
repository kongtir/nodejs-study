//如何使用Express
//1 导入模块
var http = require('http'),express = require('express'),app = express(),fs=require('fs'),logger=require('morgan'),  favicon = require('serve-favicon')
    ,methodOverride = require('method-override'),routes=require("./routes.js");
//2 设置环境变量
app.set('port',process.env.PORT||8082);
app.set('views',__dirname+'/htmls');//__dirname 跟路径
 if(!fs.existsSync('htmls'))fs.mkdirSync("htmls");
 //设置模板引擎 skip
//3注册中间件
app.use(favicon('favicon.ico'));
app.use(logger("dev"));
app.use(express.urlencoded()); //bodyParser=>
app.use(methodOverride());
//4 设置路由,处理请求 请求顺序很重要
//app.use(app.router);  //该方式已过时,不知道怎么使用,似乎不加这个也能使用
app.get('/',routes.index);

app.get('/login',routes.login);
app.get('/login_success',routes.login_success);
app.post('/login',routes.doLogin);
app.post('/',routes.api);
app.get('/user/:id',routes.userinfo);// /:id'此方法会盖掉后面的
app.all('*',routes.noFound);

//5 服务器启动
http.createServer(app).listen(app.get('port'),function (req,res) {
 console.log('服务器已启动,监听端口:%s',app.get('port'));
});
