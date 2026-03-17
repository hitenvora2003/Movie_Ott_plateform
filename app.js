var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var user = require('./routes/user');
var movie = require('./routes/movie');
var series = require('./routes/series');
var episode = require('./routes/episode');
var genre = require('./routes/genre');
var subscription = require('./routes/subscription.js');
var payment = require('./routes/payment');
var watchHistory = require('./routes/watchHistory');
var review = require('./routes/review')
var mainRoutes = require('./routes/mainRoutes.js')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/movieOTT_plateform')
  .then(() => {
    console.log('mongoDb connect successfully');

  })
  .catch(() => {
    console.log(error);

  })

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', user);
app.use('/movie', movie);
app.use('/series', series);
app.use('/episode', episode);
app.use('/genre', genre);
app.use('/subscription', subscription);
app.use('/payment', payment);
app.use('/watchHistory', watchHistory);
app.use('/review', review);
app.use('/all-data',mainRoutes);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
