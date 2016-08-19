app.directive('navauth', [function() {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      authType: "="
    },
    templateUrl: 'app/navbar/navAuth/navAuthTemplate.html',
  };
}]);