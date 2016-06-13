var app = require('./server/server.js');

app.listen(process.env.PORT || app.localPort, ()=> {
  console.log(`Listening on port ${app.localPort}!`);
});