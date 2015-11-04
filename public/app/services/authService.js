angular.module('authService', [])

// =========================================
// auth factory to login and get information
// inject $http for communicating with API
// inject $q to return 'promise' objects
// inject AuthToken to manage tokens
// =========================================


.factory('Auth', function($http, $q, AuthToken) {
  var authFactory = {};

  // handle login
  authFactory.login = function(username, password) {
    return $http.post('/api/authenticate', {
      username: username,
      password: password
  })
    .success(function(data) {
      AuthToken.setToken(data.token);
    });
  };

  // handle logout
  authFactory.logout = function() {
    // clear the token
    AuthToken.setToken();
  };

  // check if user logged in
  authFactory.isLoggedIn = function() {
    if (AuthToken.getToken())
      return true;
    else
      return false;
  };

  // get user info
  authFactory.getUser = function() {
    if (AuthToken.getToken())
      return $http.get('/api/me');
    else
      return $q.reject({
        message: 'User has no token.'
      });
  };

  // return the authFactory
  return authFactory;
})


.factory('AuthToken', function($window) {

  var authTokenFactory = {};

  // get the token
  authTokenFactory.getToken = function() {
    return $window.localStorage.getItem('token');
  };

  // set or clear token
  authTokenFactory.setToken = function() {
    if (token)
      $window.localStorage.setItem('token', token);
    else
      $window.localStorage.removeItem('token');
  };

  return authTokenFactory;
})

.factory('AuthInterceptor', function($q, AuthToken) {

  var interceptorFactory = {};

  // attach the token to every request
  interceptorFactory.request = function(config) {
    var token = AuthToken.getToken();

    // if the token exists, add to the header as x-access-token
    if (token)
      config.headers['x-access-token'] = token;

    return config;
  };

  // redirect if token doesn't authenticate
  interceptorFactory.responseError = function(response) {
    // handle 403 response
    if (response.status == 403) {
      AuthToken.setToken();
      $location.path('/login');
    }

    // return server errors as a promise
    return $q.reject(response);
  };

  return interceptorFactory;
});
