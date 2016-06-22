var express = require('express');

// Helper files
var mongodb = require('./helpers/mongodb.js'); // database connect and functions
var firebasedb = require('./helpers/firebase.js'); // firebase connect and functions
var middleware = require('./helpers/middleware.js'); // Middleware functions


app = express();

// Local port for testing
// Note: Heroku local is at 5000
app.localPort = 8011;

app.use(express.static(__dirname + '/../client'));

module.exports = app;
