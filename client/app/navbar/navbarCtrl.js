app.controller('NavbarController', ['$scope', '$state', 'Search', "Authentication", function ($scope, $state, Search, Authentication) {

  $scope.find = {};
  $scope.find.onlyOwn = false;
  $scope.loggedIn = false;

  $scope.searchResults = [];

  $scope.signUp = function() {
    // Go to pop-up modal
  }
 
  $scope.login = function() {
    // Go to pop-up modal
  }
 
  $scope.logout = function() {
    Authentication.logout();
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


  // $scope.navCollapsed = true;
  $scope.navCollapsed = false;  //This fixes an errant scrollbar issue, but makes the mobile version less optimal

}]);