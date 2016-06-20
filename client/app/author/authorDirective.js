var author = angular.module('rtApp.author', []);

author.directive('author', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/author/authorTemplate.html'
  };
}]);