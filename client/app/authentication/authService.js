authApp.factory("Authentication", ["$rootScope", "$state", function($rootScope, $state) {


  let anonUser = {uid: "Anon00000000000000000002"}

  let findCurrentUser = function() {                        // I should really make this a promise
    let user = firebase.auth().currentUser
    if (!user) {
      user = anonUser;
    }
     $rootScope.currentUser = user;
     return user;
  };

  let login = function(email, pw) {
    firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);

    });
    let authOff = firebase.auth().onAuthStateChanged(function(user) {
      $rootScope.currentUser = user;
      if (!user) {
        console.log(`Logged out`);
      } else {
        console.log(`${user.uid} logged in`);
      }
      authOff();
      $state.go('main.home')
    });
  }

  let logout = function() { firebase.auth().signOut().then(function() {
    $rootScope.currentUser = anonUser;
      console.log("Signed out");
      $state.go("main.home");
    }, function(error) {
      console.log(`error in signing out: ${error}`)
    });
  };

  return {
    findCurrentUser,
    login,
    logout
  }
}]);


// TODO: fix the overapplication of onAuthStateChanged listeners.
