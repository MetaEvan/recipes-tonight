app.directive('resultcard', [function() {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      recipe: "=",
      currentUser: "="
    },
    templateUrl: 'app/search/resultCard/resultCardTemplate.html',
  };
}]);