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

apiRouter.route('/users')
  .post(function(req, res) {
    var user = new User();

    user.name     = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err) {
      if (err) {
        // duplicate entry
        if (err.code == 11000) {
          return res.json( { success: false, message: 'User with that name exists' } );
        } else {
          return res.send(err);
        }
      }

      res.json({ message: 'User created' });
    });
  })
  .get(function(req, res){
    User.find(function(err, users){
      if (err) res.send(err);
      res.json(users);
    });
  });

apiRouter.route('/users/:user_id')
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);
      res.json(user);
    });
  })
  .put(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);
      if (req.body.name) user.name = req.body.name;
      if (req.body.username) user.username = req.body.username;
      if (req.body.password) user.password = req.body.password;
      user.save(function(err, user) {
        if (err) res.send(err);
        res.json({ message: 'User updated' });
      });
    });
  })
  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err) return res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  });

app.listen(port);
console.log('Magic happens on port ' + port);
