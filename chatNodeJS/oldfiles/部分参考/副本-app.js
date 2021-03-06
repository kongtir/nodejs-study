var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');
var log4js =require('log4js'),http=require('http') ,favicon = require('serve-favicon'),methodOverride = require('method-override');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//配置log4js https://www.npmjs.com/package/log4js


log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
var logger = log4js.getLogger();
logger.level = 'debug';
logger.info('开始启动');

// view engine setup
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
  logger.info('express server listeng on port'+app.get('port'));
});
