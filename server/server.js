var express = require('express');

app = express();

// Local port for testing
app.localPort = 8011;

// Middleware to be moved?
app.use(express.static(__dirname + '/../client'));

module.exports = app;