var express = require('express');

// Helper files
var mongodb = require('./helpers/mongodb.js'); //database connect and functions

app = express();

// Local port for testing
app.localPort = 8011;

// Middleware to be moved?
app.use(express.static(__dirname + '/../client'));

module.exports = app;
