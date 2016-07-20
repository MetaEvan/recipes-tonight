app.controller("LandingController", ["$scope", "Authentication", function($scope, Authentication) {
  
  $scope.userInput = {};

  console.log("Landing controller instantiated")

  $scope.login = function() {
    Authentication.loginEmail($scope.userInput.email, $scope.userInput.password);
  };

}]);