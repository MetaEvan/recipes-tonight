var express = require('express');
var bodyParser = require('body-parser');

// Helper files
var mongodb = require('./helpers/mongodb.js'); // database connect and functions
// var firebasedb = require('./helpers/firebase.js'); // firebase connect and functions -- Currently not used serverside
// var middleware = require('./helpers/middleware.js'); // Middleware functions


app = express();

// Local port for testing
// Note: Heroku local is at 5000
app.localPort = 8011;

if (!process.env.PORT) {
  keys = require('./config/keys.js');
} else {
  
}

app.use(express.static(__dirname + '/../client')); 
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
   

// app.post("/addRecipe", function(req, res) {
//   console.log(`Post addRecipe data: ${req.data}, body: ${req.body}`);
//   mongodb.insertNewRecord(null, req.body, "recipes", function(db = null, recipeId) {
//     res.status(201).send(recipeId);
//     console.log(recipeId);
//   })
// });

app.post("/addRecipe", function(req, res) {
  console.log(`Post addRecipe body:`, req.body);
  mongodb.addRecipe(req.body, function(db, userEntry) {
    console.log(`result recipes`, userEntry.recipes)
    let recipeId = userEntry.recipes.pop();
    res.status(201).send(recipeId);
    console.log(`Added recipeId is ${recipeId}`);
    mongodb.closeDB(db);
  })
});



app.post("/addPhotoUrls", function(req, res) {
  console.log(`Post addPhotoUrls body:`, req.body);
  mongodb.addPhotoUrls(req.body, function(db, recipe) {
    console.log(`result addPhotoUrls`, recipe.photos)
    res.status(201).send("success");
    mongodb.closeDB(db);
  })
});



app.post("/findRecipes", function(req, res) {
  console.log(`Post findRecipes body:`, req.body);
  mongodb.findRecipes(req.body, function(db, results) {
    console.log(`findRecipes results:`, results)
    res.status(201).send(results);
    mongodb.closeDB(db);
  })
});





app.post("/allRecipes", function(req, res) {    //only usable until the db gets to be a certain (far off) size
  console.log(`all recipes requested`, req.body);
  mongodb.allRecipes(req.body, function(db, results) {
    console.log(`all recipes:`, results)
    res.status(201).send(results);
    mongodb.closeDB(db);
  })
});

// Not currently planned for use

// app.post("/addUser", function(req, res) {
//   console.log(`Post addRecipe body: ${req.body}`);
//   mongodb.addUser(req.body, function(db, mongoUserID) {
//     res.status(201).send(mongoUserID);
//     console.log(`Added mongoUserID is ${mongoUserID}`);
//   })
// });

app.get('/test', function(req, res) {
  res.send('hello tester');
});

app.post('/', function(req, res) {
  res.send('POST request to the homepage');
});

module.exports = app;


// app.post('/sessions/create', function(req, res) {
//   if (!req.body.username || !req.body.password) {
//     return res.status(400).send("You must send the username and the password");
//   }

//   var user = _.find(users, {username: req.body.username});
//   if (!user) {
//     return res.status(401).send("The username or password don't match");
//   }

//   if (!user.password === req.body.password) {
//     return res.status(401).send("The username or password don't match");
//   }

//   res.status(201).send({
//     id_token: createToken(user)
//   });
// });