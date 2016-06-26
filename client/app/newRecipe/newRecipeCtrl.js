app.controller("NewRecipeController", ["$scope", "$http", function($scope, $http) {

  $scope.newRecipe = {
    ingredients: [],
    text: "",
    totalTime: 0,
    activeTime: 0,
    source: "",
    uploadedBy: "",
    dateAdded: 0,
    locationAdded: "",
  };
  console.log("NewRecipeController running.")

  $scope.addRecipe = function(){
    $scope.newRecipe.dateAdded = Date.now();
    $scope.newRecipe.uploadedBy = $scope.currentUser.uid;

    $http({
      url: "/addRecipe",
      method: "POST",
      data: $scope.newRecipe
    }).then(function(res) {
      console.log(`addRecipe response: body, ${res.body}, data, ${res.data}`);
    }, function(err) {
      console.log(`Error adding recipe: ${err.data}`)
    })

  }
}]);