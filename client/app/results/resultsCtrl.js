app.controller("ResultsController", ["$http", "$scope", function($http, $scope) {
  
  var results = this;

  $scope.find = {};
  $scope.loggedIn = false;
  $scope.find.onlyOwn = false;

  $scope.searchResults = [];

  if($scope.currentUser.uid) {
    $scope.loggedIn = true;
    $scope.find.onlyOwn = true;
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

    alert("Search Request Submitted!")  // Todo: switch this out for an appropriate reset()
    console.log(searchTerms, "Submitted")

    $http({
      url: "/findRecipes",
      method: "POST",
      data: searchTerms
    }).then(function(res) {
      console.log(`findRecipes response: ${res.data}`);
      $scope.displayRecipes(res.data);
    }, function(err) {
      console.log(`Error finding recipes: ${err.data}`)
    })
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

    alert("all recipe request Submitted!")  // Todo: switch this out for an appropriate reset()
    console.log(searchTerms, "Submitted")

    $http({
      url: "/allRecipes",
      method: "POST",
      data: searchTerms
    }).then(function(res) {
      console.log(`allRecipes response: ${res.data}`);
      $scope.displayRecipes(res.data);
    }, function(err) {
      console.log(`Error getting all recipes: ${err.data}`)
    })
  }

  $scope.displayRecipes = function(searchResults) {
    $scope.searchResults = searchResults;
  }

}]);