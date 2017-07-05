var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/partials/login.html',
      controller: 'authController as ac'
    })
    .when('/register', {
      templateUrl: 'views/partials/register.html',
      controller: 'authController as ac'
    })
    .when('/capture', {
      templateUrl: 'views/partials/capture.html',
      controller: 'captureController as cc'
    });
});
