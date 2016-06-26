var firebase = require("firebase");

firebase.initializeApp({
  serviceAccount: "./server/config/fbkeys.json",
  databaseURL: "https://recipes-tonight.firebaseio.com/"
});

var db = firebase.database();
let ref = db.ref("Check");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});


// let uid = "1";

// var token = firebase.auth().createCustomToken(uid);

// console.log(token.length);