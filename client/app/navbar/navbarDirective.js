app.directive('navbar', [function() {
  return {
    restrict: 'E',
    replace: true,
    controller: 'NavbarController',
    controllerAs: 'navbar',
    templateUrl: '/app/navbar/navbarTemplate.html'
  };
}]);