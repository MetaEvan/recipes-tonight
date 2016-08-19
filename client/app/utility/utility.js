var utilityApp = angular.module('utility', [
  'firebase',
])

.config(function() {

  // Connect to Firebase
  var config = {
    apiKey: "AIzaSyAHT16rmIHxzxH_Vf9oss2xM4jA2h7iMhI",
    authDomain: "recipes-tonight.firebaseapp.com",
    databaseURL: "https://recipes-tonight.firebaseio.com",
    storageBucket: "recipes-tonight.appspot.com"
  };
  firebase.initializeApp(config);
})


// Depricated

// .run(["$rootScope", "$state", "Auth", function($rootScope, $state, Auth) {
  // $rootScope.authChangeCounter = 0;  // For testing only!  Please delete before production. Todo: delete this!

  // let offAuth = Auth.$onAuthStateChanged(function(user) {
  //   $rootScope.currentUser = user;
  //   if (!user) {
  //     $rootScope.currentUser = {uid: null, email: "not@here.com"}
  //   }

  //   $rootScope.authChangeCounter++; // For testing only!  Please delete before production. Todo: delete this!
  //   console.log(`Current User is ${$rootScope.currentUser.uid || "no one"} on authentication initiation, ${$rootScope.authChangeCounter} times`);
    
  //   offAuth();
  // })
// }])


  // if (!$rootScope.currentUser) {
  //   console.log(`redirected? ${$rootScope.currentUser}, yeah?`);
  //   $state.go('main.newRecipe');
  // } else {

  //   firebase.auth().onAuthStateChanged(function(user) {
  //     console.log(`Current User is now ${user.email || "no one"}`);
  //     $rootScope.currentUser = user;
  //     if (user) {
  //       // User is signed in.
  //       console.log("user signed in")
  //       $state.go("main.home");
  //     } else {
  //       // No user is signed in.
  //       $rootScope.currentUser = firebase.auth().currentUser;
  //       console.log("user signed out", user.email)
  //       $state.go("main.home");
  //     }
  //   });

  // }
