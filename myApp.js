const express = require('express');
const helmet = require('helmet');
const app = express();


// Use Helmet for security
app.use(helmet()); // This applies Helmet as middleware
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard(
  { 
    action: 'deny' 
  }
));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts(
  { 
    maxAge: 90 * 24 * 60 * 60, 
    force: true 
  }
));


// DO NOT TOUCH BEYOND HERE
module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
