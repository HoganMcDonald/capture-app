var app = angular.module('myApp', ['ngRoute', 'ngTouch']);

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
    })
    .when('/success', {
      templateUrl: 'views/partials/success.html'
    })
    .when('/feed', {
      templateUrl: 'views/partials/feed.html',
      controller: 'snippetController as sc'
    })
    .when('/snippet', {
      templateUrl: 'views/partials/snippet.html',
      controller: 'snippetController as sc'
    })
    .when('/newBucket', {
      templateUrl: 'views/partials/newBucket.html',
      controller: 'snippetController as sc'
    })
    .when('/search', {
      templateUrl: 'views/partials/search.html',
      controller: 'snippetController as sc'
    });
});
