app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.
    otherwise("/landing");

  $stateProvider
    .state('landing', {
      url: "/landing",
      // controller: 'LandingController',
      // controllerAs: 'landing',
      views: {
        "": {
          templateUrl: "app/landing/landingTemplate.html"
        }
      }
    })
    .state('main', {
      url: "/main",  // Main Controller was assigned to the index.html body
      views: {
        "": {
          templateUrl: "app/main/mainTemplate.html"
        }
      }
    })
    .state('main.home', {
      url: "^/home",
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
    .state('main.search', {
      url: "^/search",
      controller: 'SearchController',
      controllerAs: 'search',
      views: {
        "content": {
          templateUrl: "app/search/searchTemplate.html"
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

app.run(["$rootScope", "$state", "Auth", function($rootScope, $state, Auth) {
  

  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
    let currentUser = Auth.$getAuth()  // Todo: This has a possible async error.  Test for it later.
    
    if ($rootScope.currentUser !== currentUser) {
      $rootScope.currentUser = currentUser;
    } else {
      // $state.go("anywhere");  // NEVER DO THIS
    }
  });
}]);
