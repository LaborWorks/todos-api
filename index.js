// ENV Variables
require('dotenv').config()

// Core
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

// var nts
var config = require('./config');
var port = process.env.PORT || 8094;
var host = process.env.HOST || 'localhost';

// Database
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);

// App & Config
var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// Middleware
app.use(morgan('dev'));

// TodoRoutes
var routes = require('./routes');
app.get('/todos', routes.index);
app.get('/todos/:id', routes.show);
app.post('/todos', routes.create);
app.put('/todos/:id', routes.update);
app.delete('/todos/:id', routes.destroy);

// Serving
app.listen(port);
console.log('TodosApi has started on: ' + host + ':' + port);
