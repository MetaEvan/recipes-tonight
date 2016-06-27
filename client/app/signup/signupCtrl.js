app.controller("SignupController", ["$scope", "$http", function($scope, $http) {

  $scope.newUser = {
    email: "",
    uid: "",
    name: "",
    lastLogin: 0,
    totalLogins: 0,
    recipes: [],
    dateAdded: 0,
    locationAdded: "",
  };
  console.log("signupController running.");

  var uiConfig = {
    'signInSuccessUrl': '#/home',
    'signInOptions': [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    // 'tosUrl': '<your-tos-url>',
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var auth = firebase.auth();
  var ui = new firebaseui.auth.AuthUI(auth);
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);


  // $scope.addRecipe = function(){
  //   $scope.newRecipe.dateAdded = Date.now();
  //   if ($scope.currentUser) {
  //     $scope.newRecipe.uploadedBy = $scope.currentUser.uid;
  //   } else {
  //     $scope.newRecipe.uploadedBy = "Anon00000000000000000001"
  //   }

  //   alert("Recipe Submitted!")

  //   $http({
  //     url: "/addRecipe",
  //     method: "POST",
  //     data: $scope.newRecipe
  //   }).then(function(res) {
  //     console.log(`addRecipe response: body, ${res.body}, data, ${res.data}`);
  //   }, function(err) {
  //     console.log(`Error adding recipe: ${err.data}`)
  //   })

  // }
}]);