var app = require('./server/server.js');

let activePort = process.env.PORT || app.localPort;
app.listen(activePort, function(){ console.log(`Listening on port ${activePort}!`) });