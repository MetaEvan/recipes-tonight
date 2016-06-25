authApp.factory("Authentication", ["$rootScope", "$state", function($rootScope, $state) {


  // let findCurrentUser = ()=> firebase.auth().currentUser;  //faster, but not always reliable.

  let findCurrentUser = function(cb) {                        // I should really make this a promise
    firebase.auth().onAuthStateChanged(function(user) {
      $rootScope.currentUser = user;
      return cb(user);
    })
  };

  let login = function(email, pw) {
    firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    })
    firebase.auth().onAuthStateChanged(function(user) {
      $rootScope.currentUser = user;
      if (!user) {
        console.log(`Logged out`);
      } else {
        console.log(`${user.email} logged in`);
      }
      $state.go('main.home')
    });
  }

  let logout = function() { firebase.auth().signOut().then(function() {
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
