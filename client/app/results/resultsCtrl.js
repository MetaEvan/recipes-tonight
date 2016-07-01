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

    alert("Search Request Submitted!")
    console.log(searchTerms, "Submitted")


    $http({
      url: "/findRecipes",
      method: "POST",
      data: searchTerms
    }).then(function(res) {
      console.log(`findRecipes response: ${res.data}`);
      $scope.displayRecipes(res.data);
    }, function(err) {
      console.log(`Error adding recipe: ${err.data}`)
    })

  }

  $scope.displayRecipes = function(searchResults) {
    $scope.searchResults = searchResults;
  }

}]);