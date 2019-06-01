var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');
var mongodb =require('mongodb');
var log4js =require('log4js'),http=require('http') ,favicon = require('serve-favicon'),methodOverride = require('method-override');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//配置log4js https://www.npmjs.com/package/log4js
log4js.configure({
  appenders: {default:{type: 'console'}, cheese: { type: 'file', filename: 'logs/1.log' ,maxLogSize:102400,backups:4} },
  categories: { default: { appenders: ['default'], level: 'info' },cheese: { appenders: ['default','cheese'], level: 'debug' } },
  replaceConsole:true
});//然后需要注册log4js

var app = express();
// view engine setup
//app.use(log4js.connectLogger(log4js.getLogger("default"),{level:log4js.levels.INFO})); //似乎只能连接一个...
app.use(log4js.connectLogger(log4js.getLogger("cheese"),{level:log4js.levels.INFO,format:':method:url:status'}));
app.set('port',process.env.PORT||3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
http.createServer((app).listen(app.get('port')),function () {
  console.log('express server listeng on port'+app.get('port'));
});
