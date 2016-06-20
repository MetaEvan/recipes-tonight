app.controller("MainController", ["$state", function($state) {

  // Used for Landing and Home pages

  var main = this;

  // Initialization functions
  main.initialize = function() {
    console.log("initialized")
    $state.go("main.home");
  }
}]);