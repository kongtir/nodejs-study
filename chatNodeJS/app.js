var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan'); //原来的
var log4js = require("./common/log4jsc");
var routeManager = require('./routes/routeManager');
//session https://blog.csdn.net/cckevincyh/article/details/79816491
var session = require("express-session");
var uuid = require('node-uuid');
var app = express();
var bodyParser = require('body-parser'); //上传文件用的
const multer = require('multer'); //好像也是传文件的
// 设置保存上传文件路径
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
   // console.log(file);
    var originalname = file.originalname.split(".");
    originalname = originalname[originalname.length-1];
    var  date =new Date() ;
    date =date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate()
        +"_"+date.getHours()+'.' +date.getMinutes()+'.' + date.getSeconds()
        +"_"+uuid.v1().split("-")[4];
    // file.fieldname + '_' +
    cb(null,date+"."+originalname)
  }
});

var upload = multer({ storage: storage })
//const upload = multer({dest: './public/upload'});// 处理上传文件
app.use(upload.any());// 处理表单提交，对应请求头application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));// 为true时将使用qs库处理数据，通常不需要
app.use(bodyParser.json());// 处理fetch请求，对应请求头application/json

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(log4js.connectLogger(log4js.getLogger("c3"),{level:log4js.levels.INFO,format:':remote-addr:method:url:status'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
//res.send('你好'+req.session.userinfo+'欢迎回来');
//  req.session.userinfo="zhangsan111"; /*设置session*/
app.use(function (err, req, res, next) {
  if(err){
    log4js.getLogger("err").error(err.stack);
    res.send(500,'服务器错误');
  }else next();
});
app.use(function (err, req, res, next) {
  if(err) res.send(500,'出错呐');else next();
});
process.on("uncaughtException",function (err) {
  log4js.getLogger("err").error("未处理的异常\r"+err.stack);
});
//注册路由信息
routeManager.reg(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
