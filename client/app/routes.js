app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.
    otherwise("/landing");

  $stateProvider
    .state('landing', {
      url: "/landing",
      controller: 'LandingController',
      controllerAs: 'landing',
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
      url: "^/home",
      controller: 'MainController',
      controllerAs: 'main',
      views: {
        "content": {
          templateUrl: "app/home/homeTemplate.html"
        }
      }
     })
    .state('main.newRecipe', {
      url: "^/new-recipe",
      controller: 'NewRecipeController',
      controllerAs: 'newRecipe',
      views: {
        "content": {
          templateUrl: "app/newRecipe/newRecipeTemplate.html"
        }
      },
     })
    .state('main.results', {
      url: "^/results",
      controller: 'ResultsController',
      controllerAs: 'results',
      views: {
        "content": {
          templateUrl: "app/results/resultsTemplate.html"
        }
      }
     })
    .state('main.signup', {
      url: "^/signup",
      controller: 'SignupController',
      controllerAs: 'signup',
      views: {
        "content": {
          templateUrl: "app/signup/signupTemplate.html"
        }
      }
     })
  });

app.run(["$rootScope", "$state", "Authentication", function($rootScope, $state, Authentication) {
  

  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
    if ($rootScope.currentUser !== Authentication.findCurrentUser()) {
      $rootScope.currentUser = Authentication.findCurrentUser();
      // Todo: This has a possible async error.  Test for it later.
    }
  });
}]);
