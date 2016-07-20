utilityApp.factory("Authentication", ["$rootScope", "$state", "Auth", function($rootScope, $state, Auth) {


  let anonUser = {uid: null, email: "Guest"}

  // Todo: findCurrentUser might still fail in the middle of some $digest cycles?, so make this a promise & use the async method
  let findCurrentUser = function() {             
    let user = Auth.$getAuth()
    if (!user) {
      user = anonUser;
    }
     return user;
  };

  let currentUser = findCurrentUser();

  let signUpEmail = function(email, pw) {
    firebase.auth().createUserWithEmailAndPassword(email, pw).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    })
    .then( function() {
      loginEmail(email, pw);
    });
  }

  let loginEmail = function(email, pw) {
    console.log(email, pw);
    firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }).then(function() {
      let authOff = Auth.$onAuthStateChanged(function(user) {
        if (!user) {
          console.log(`Logged out`, user);
        } else {
          currentUser = user;
          console.log(`${user.uid} logged in`);
        }
        authOff();
        $state.go('main.home')
      });
    })
  }

  let signupFacebook = function() {
    let fbProvider = new firebase.auth.FacebookAuthProvider();
    fbProvider.addScope('email');

    if(false) {  //  Fix this, once you figure out what you get
      alert("You already have an account with us.  Logging in now")
    }
  }

  let logout = function() { 

    // // There's a question in the AngularFire Dev as to whether the following should be a promise like firebase.auth.signout() is.  Probably not an issue?  Todo: [Low Priority] Check on this.
    // Auth.$signOut();
    // // After internal testing it is clear that it shouldn't be sync, as the following quick test shows a user still signed in.
    //     // let quickUserTest = Auth.$getAuth();
    //     // console.log("The user is still", quickUserTest);  // returns user before logout.


    // using the base firebase (not AngularFire) version to prevent weird async stuff and getting no logs of it.
    firebase.auth().signOut().then(function(){     
      console.log("Signed out");
      currentUser = anonUser;
      $state.go("main.home");  // maybe route elsewhere via the onAuthStateChange?
    }).catch(function(error) {
      console.log(error, " in signing out")
    })

  };

  return {
    findCurrentUser,
    loginEmail,
    logout,
    signUpEmail,
    currentUser,    // Should stay identical to result of Auth.$getAuth AND what is help in the main controller's $scope.currentUser.  Using this value for testing performance and security "later"  Todo: [Low Priority] Do this?
  }
}]);

