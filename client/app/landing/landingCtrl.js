app.controller("LandingController", ["$scope", "Authentication", function($scope, Authentication) {
  
  var landing = this;
  console.log(`LandingController initialized, current user is ${$scope.currentUser.uid}`); // some weird race condition stuff here...
  $scope.user = {email: "esierria@yahoo.com", password:"password"};

  $scope.button = function() {
    let user = Authentication.findCurrentUser();
    if (user) {
      console.log(user.email, user.uid, "user")
    } else {
      console.log("No user")
    };
  }

  $scope.login = function() {
    console.log("Landing Login")
    Authentication.login($scope.user.email, $scope.user.password);
    // firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   console.log(errorCode, errorMessage);
    // });
  };

}]);