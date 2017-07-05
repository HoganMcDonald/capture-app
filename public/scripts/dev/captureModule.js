var app = angular.module('myApp', ['ngRoute']);


app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/partials/login.html',
    controller: 'MainController'
  }).when('/register', {
    templateUrl: 'views/partials/register.html',
    controller: 'MainController'
  });
});
