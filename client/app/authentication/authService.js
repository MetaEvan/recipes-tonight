authApp.factory("Authentication", ["$rootScope", "$state", "Auth", function($rootScope, $state, Auth) {


  let anonUser = {uid: null}

  // Todo: findCurrentUser might still in the middle of some $digest cycles?, so make this a promise & use the async method
  let findCurrentUser = function() {             
    let user = Auth.$getAuth()
    if (!user) {
      user = anonUser;
    }
     $rootScope.currentUser = user;
     return user;
  };

  let signUp = function() {

  }

  let login = function(email, pw) {
    firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    // }).then(function() {
      console.log("fun testing!");
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

  let logout = function() { 
    firebase.auth().signOut().then(function() {
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
    logout,
    signUp
  }
}]);

