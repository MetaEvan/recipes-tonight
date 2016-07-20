app.controller('NavbarController', ['$scope', '$state', 'Search', 'Authentication', 'ResponsiveDetection', function ($scope, $state, Search, Authentication, ResponsiveDetection) {

  $scope.find = {};
  $scope.find.onlyOwn = false;
  $scope.loggedIn = false;

  $scope.searchResults = [];


  $scope.userInput = {
  };

  let signUpEmail = function(email, pw) {
    Authentication.signUpEmail(email, pw);
  }

  let signUpFacebook = function() {
  }
 
  let loginEmail = function(email, pw) {
    Authentication.loginEmail(email, pw);
  }

  let loginFacebook = function() {
  }
 
  $scope.logout = function() {
    Authentication.logout();
  }

  $scope.signUpTemplate = {
    title: "Sign Up",
    text: "Sign up",
    emailAuth: signUpEmail,
    facebookAuth: signUpFacebook
  }

  $scope.loginTemplate = {
    title: "Log In!",
    text: "Log in",
    emailAuth: loginEmail,
    facebookAuth: loginFacebook
  }


  $scope.$on("userChanged", function(event, data) {
    $scope.currentUser = data;
    $scope.loggedIn = !!$scope.currentUser;
  })


  $scope.quickSearch = function() {
    console.log("quickSearch started in navbar with searchText:", $scope.find.searchText)
    let searchTerms = {
      recipeText: $scope.find.searchText,
      onlyOwn: $scope.find.onlyOwn
    };
    if ($scope.currentUser.uid) {
      searchTerms.uid = $scope.currentUser.uid;
    } else {
      searchTerms.uid = null;
    }

    Search.getRecipes(searchTerms, "/findRecipes", function(searchResults) {
      $state.go("main.search").then(function(){
        $scope.searchResults = searchResults;
      });
    });

    alert("Search Request Submitted!")  // Todo: switch this out for an appropriate reset()
  }

  // A bit of a hack to get around some loading twitchiness (i.e., errant scrollbars on the navbar)
  $scope.navCollapsed = ResponsiveDetection.getBreakpoint() === 'xs';

}]);