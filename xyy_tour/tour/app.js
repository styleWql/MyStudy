var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser');
var session=require('express-session')

var indexRouter = require('./routes/index');
var listRouter = require('./routes/list');
var usersRouter = require('./routes/users');
var secondRouter = require('./routes/secondary_router');
var detailRouter = require('./routes/detail');
var fileRouter = require('./routes/fileRouter');
var logRouter=require('./routes/log');
var communityRouter = require('./routes/community');
var fileRouters = require('./routes/files'); 
var router = express.Router();



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', secondRouter); 
app.use('/',listRouter);
app.use('/',detailRouter);
app.use('/file',fileRouter);
app.use('/community', communityRouter);
app.use('/files',fileRouters);
app.use(session({
  name:'pleaseBeKind',
  secret:'wierdWords',
  cookieParser:{maxAge:30000},//最大过期时间，毫秒
  resave:true,//发生请求重置计时
  rolling:true,
  saveUninitialized: true
}))
app.use('/', indexRouter);
app.use('/log',logRouter);

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

router.get('/destroy.do', function (req, res) {
  req.session.destroy()
  res.redirect('/')
})
module.exports = app;
