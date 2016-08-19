app.controller("SearchController", ["$http", "$scope", "Search", "Auth", function($http, $scope, Search, Auth) {
  
  // Sets up some bound default variables
  $scope.find = {};
  $scope.find.onlyOwn = false;
  $scope.searchResults = [];
  //**********************************************************


  // Controls logged-in status
  let anonUser = {uid: null, email: "Guest"};
  $scope.currentUser = $scope.currentUser || anonUser;
  $scope.loggedIn = !!$scope.currentUser.uid;

  $scope.$on("userChange", function(event, data) {
    $scope.currentUser = data;
    $scope.loggedIn = !!$scope.currentUser && !!$scope.currentUser.uid;
    console.log("SearchController data,", data.email, `loggedIn ${$scope.loggedIn}`)
  })
  //**********************************************************

  $scope.openRecipe = function(recipe) {
    alert("You're awesome!")
  }


  $scope.findRecipes = function(){
    let searchTerms = {
      recipeText: $scope.find.searchText,
      onlyOwn: $scope.find.onlyOwn
    };
    if ($scope.currentUser.uid) {
      searchTerms.uid = $scope.currentUser.uid;
    } else {
      searchTerms.uid = null;
    }

    Search.getRecipes(searchTerms, "/findRecipes", displayRecipes);

    alert("Search Request Submitted!")  // Todo: switch this out for an appropriate reset()
  }

  $scope.allRecipes = function(){
    let searchTerms = {
      recipeText: $scope.find.searchText,
      onlyOwn: $scope.find.onlyOwn
    };
    if ($scope.currentUser.uid) {
      searchTerms.uid = $scope.currentUser.uid;
    } else {
      searchTerms.uid = null;
    }

    Search.getRecipes(searchTerms, "/allRecipes", displayRecipes);

    alert("all recipe request Submitted!"); // Todo: switch this out for an appropriate reset()
  }

   let displayRecipes = function(searchResults) {
    $scope.searchResults = searchResults;
  }

}]);