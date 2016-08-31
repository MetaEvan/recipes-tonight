app.directive('recipemodal', [function() {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      recipe: "=",
      currentUser: "="
    },
    templateUrl: 'app/search/resultCard/recipeModalTemplate.html',
  };
}]);