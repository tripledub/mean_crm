/*jshint unused:vars */
var config = require('./config');

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var morgan = require('morgan');

var mongoose = require('mongoose');
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Configure to handle CORS requests
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();
});

app.use(morgan('dev'));

var path = require('path');

var apiRoutes = require('./app/routes/api') (app, express);
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE --------
// SEND USERS TO FRONTEND
// must be registerd after API Routes
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.port);
console.log('Magic happens on port ' + config.port);
