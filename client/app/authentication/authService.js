authApp.factory("Authentication", [function() {


  let findCurrentUser = ()=> firebase.auth().currentUser;  //consider changing to onAuthStateChanged

  let logout = function() { firebase.auth().signOut().then(function() {
      console.log("Signed out");
      $state.go("landing");
    }, function(error) {
      console.log(`error in signing out: ${error}`)
    });
  };

  return {
    findCurrentUser,
    logout
  }
}]);