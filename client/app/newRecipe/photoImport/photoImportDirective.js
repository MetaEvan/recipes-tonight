app.directive('photoimport', [function() {
  return {
    restrict: 'A',
    replace: true,
    controller: 'PhotoImportController',
    scope: {
      subject: "@"
    },
    templateUrl: 'app/newRecipe/photoImport/photoImportTemplate.html',
  };

}]);