app.controller("SearchController", ["$http", "$scope", "Search", "Auth", function($http, $scope, Search, Auth) {
  
  let anonUser = {uid: null, email: "Guest"};

  $scope.find = {};
  $scope.find.onlyOwn = false;
  
  $scope.searchResults = [];
  
  $scope.currentUser = $scope.currentUser || anonUser;
  $scope.loggedIn = !!$scope.currentUser.uid;


  $scope.$on("userChange", function(event, data) {
    $scope.currentUser = data;
    $scope.loggedIn = !!$scope.currentUser && !!$scope.currentUser.uid;
    console.log("SearchController data,", data, `loggedIn ${$scope.loggedIn}`)
  })


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