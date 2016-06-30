app.controller("NewRecipeController", ["$scope", "$http", function($scope, $http) {

  $scope.newRecipe = {
    ingredients: [],
    recipeText: "",
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
    if ($scope.currentUser) {
      $scope.newRecipe.uploadedBy = $scope.currentUser.uid;
    } else {
      $scope.newRecipe.uploadedBy = "Anon00000000000000000001"
    }

    alert("Recipe Submitted!")

    $http({
      url: "/addRecipe",
      method: "POST",
      data: $scope.newRecipe
    }).then(function(res) {
      console.log(`addRecipe response added recipe with docId: ${res.data}`);
    }, function(err) {
      console.log(`Error adding recipe: ${err.data}`)
    })

  }
}]);