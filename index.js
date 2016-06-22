var app = require('./server/server.js');

let activePort = process.env.PORT || app.localPort;
app.listen(activePort, ()=> console.log(`Listening on port ${activePort}!`));