'use strict';
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let contacts = require('./routes');

module.exports = function () {
  let app = express();
  let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use('/contacts', contacts);
  return app;
};