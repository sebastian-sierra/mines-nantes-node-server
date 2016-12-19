'use strict';

let mongoose = require('mongoose');
let http = require('http');
let appBuilder = require('./application');

mongoose.connect('mongodb://localhost/contacts');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected');
  let app = appBuilder();
  let server = http.Server(app);
  server.listen(3000);
});



