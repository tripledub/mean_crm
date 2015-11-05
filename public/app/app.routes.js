angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

  $routeProvider

    // home page route
    .when('/', {
      templateUrl : 'app/views/pages/home.html'
    })
  
    .when('/login', {
      templateUrl  : 'app/views/pages/login.html',
      controller   : 'mainController',
      controllerAs : 'login'
    }) 

    .when('/users', {
      templateUrl  : 'app/views/pages/users/all.html',
      controller   : 'userController',
      controllerAs : 'user'
    })
  ;

  // get shot of hash in the URL
  $locationProvider.html5Mode(true);

});
