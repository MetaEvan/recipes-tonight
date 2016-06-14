var express = require('express');

app = express();

// Local port for testing
app.localPort = 8011;

// Middleware to be moved?
app.use(express.static(__dirname + '/../client'));


// Connect to database (To be moved)
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dbUrl = `mongodb://${process.env.mLabUser}:${process.env.mLabPW}@ds025973.mlab.com:25973/rtdb`;

console.log(dbUrl);

// dbUrl = 'mongodb://localhost:27017/test';

MongoClient.connect(dbUrl, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});






module.exports = app;
