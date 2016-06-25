app.controller("MainController", ["$scope", "$state", "Authentication", function($scope, $state, Authentication) {

  // Used for logged-in pages

  var main = this;

  $scope.logout = function() {
    Authentication.logout();
  }

  // Initialization operations
  main.initialize = function() {
    console.log("MainCtrl initialized");
  }
}]);