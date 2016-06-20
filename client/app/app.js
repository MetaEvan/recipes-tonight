var app = angular.module('rtApp', [
  'ui.router',
  'rtApp.author'
  ]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.
    otherwise("/landing");

  $stateProvider
    .state('landing', {
      url: "/landing",
      controller: 'MainController',
      controllerAs: 'main',
      views: {
        "": {
          templateUrl: "./app/landing/landing.html"
        }
      }
     })
    .state('main', {
      url: "/main",
      controller: 'MainController',
      controllerAs: 'main',
      views: {
        "": {
          templateUrl: "./app/main/main.html"
        }
      }
     })
  });

