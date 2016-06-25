var authApp = angular.module('authentication', [
  'firebase',
])

.config(function() {

  // Initialize the Firebase SDK
  var config = {
    apiKey: "AIzaSyAHT16rmIHxzxH_Vf9oss2xM4jA2h7iMhI",
    authDomain: "recipes-tonight.firebaseapp.com",
    databaseURL: "https://recipes-tonight.firebaseio.com",
    storageBucket: "recipes-tonight.appspot.com"
  };
  firebase.initializeApp(config);
})

.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.currentUser = firebase.auth().currentUser;

  console.log(`Current User is ${$rootScope.currentUser || "no one"}`);

  if (!$rootScope.currentUser) {
    $state.go('landing');
  } else {

    firebase.auth().onAuthStateChanged(function(user) {
      console.log(`Current User is now ${user.email || "no one"}`);
      $rootScope.currentUser = user;
      if (user) {
        // User is signed in.
        console.log("user signed in")
        $state.go("main.home");
      } else {
        // No user is signed in.
        $rootScope.currentUser = firebase.auth().currentUser;
        console.log("user signed out", user.email)
        $state.go("main.home");
      }
    });

  }
}])
