app.controller("MainController", ["$scope", "$state", "Auth", function($scope, $state, Auth) {

  let anonUser = {uid: null, email: "Guest"};
  let authChangeCounter = 0;  // For testing only!  Please delete before production. Todo: delete this!

  let offAuth = Auth.$onAuthStateChanged(function(user) {
    $scope.currentUser = user;
    if (!user) {
      $scope.currentUser = anonUser;
    }
    $scope.$broadcast("userChange", $scope.currentUser);

    authChangeCounter++; // For testing only!  Please delete before production. Todo: delete this!
    console.log(`Current User is ${$scope.currentUser.uid || "no one"} in MainController, ${authChangeCounter} times`);
    
    $scope.loggedIn = !!$scope.currentUser.uid;
  })

}]);