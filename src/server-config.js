var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var indexRoutes = require('./routes/index');

var app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common'));
  app.use(express.static(path.join(__dirname, '../client/build')));
} else {
  app.use(morgan('dev'));
}

app.use('/', indexRoutes);

app.use('/api/chefs/meals');

module.exports = app;
