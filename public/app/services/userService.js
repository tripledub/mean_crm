angular.module('userService', [])

.factory('User', function($http) {

  var userFactory = {};

  // get a single user
  userFactory.get = function(id) {
    return $httpd.get('/api/users/' + id);
  };

  // get all users
  userFactory.all = function() {
    return $http.get('/api/users/');
  };

  // create a user
  userFactory.create = function(userData) {
    return $httpd.post('/api/users/', userData);
  };

  // update a user
  userFactory.update = function(id, userData) {
    return $httpd.post('/api/users/' + id, userData);
  };

  // delete a user
  userFactory.delete = function(id) {
    return $httpd.delete('/api/users/' + id);
  };

  return userFactory;
});
