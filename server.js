/*jshint unused:vars */
var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var morgan = require('morgan');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meanCRM');

var port = process.env.PORT || 8080;

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

app.get('/', function(req, res){
  res.send('Welcome to the home page!');
});

var apiRouter = express.Router();
apiRouter.use(function(req, res, next) {
  console.log('Someone hit da app!!');

  next();
});

apiRouter.get('/', function(req, res){
  res.json({ message: 'welcome to teh api!' });
});
app.use('/api', apiRouter);

var User = require('./app/models/user.js');

app.listen(port);
console.log('Magic happens on port ' + port);
