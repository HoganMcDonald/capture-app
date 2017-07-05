var app = angular.module('myApp', ['ngRoute']);


app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/partials/login.html',
      controller: 'authController'
    })
    .when('/register', {
      templateUrl: 'views/partials/register.html',
      controller: 'authController'
    });
});
