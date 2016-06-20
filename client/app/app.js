var app = angular.module('rtApp', [
  'ui.router',
  'rtApp.author',
  'rtApp.results',
  'rtApp.newRecipe'
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
          templateUrl: "app/landing/landingTemplate.html"
        }
      }
     })
    .state('main', {
      url: "/main",
      controller: 'MainController',
      controllerAs: 'main',
      views: {
        "": {
          templateUrl: "app/main/mainTemplate.html"
        }
      }
     })
    .state('main.home', {
      url: "/home",
      controller: 'MainController',
      controllerAs: 'main',
      views: {
        "content": {
          templateUrl: "app/home/homeTemplate.html"
        }
      }
     })
    .state('main.newRecipe', {
      url: "/newRecipe",
      controller: 'NewRecipeController',
      controllerAs: 'newRecipe',
      views: {
        "content": {
          templateUrl: "app/newRecipe/newRecipeTemplate.html"
        }
      }
     })
    .state('main.results', {
      url: "/results",
      controller: 'ResultsController',
      controllerAs: 'results',
      views: {
        "content": {
          templateUrl: "app/results/resultsTemplate.html"
        }
      }
     })
  });

