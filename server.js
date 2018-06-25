'use strict';
const express = require('express');
const app = express();
const AppService = require('./services/app-service.js').AppService;

app.use(express.static('public'));
app.use('/custom-url/:service', makeAppRequest);

function makeAppRequest(req, res, next) {
  return new AppService(req, res, next);
}

app.listen('3000', function() {
  console.log("Server running on port 3000");
});
