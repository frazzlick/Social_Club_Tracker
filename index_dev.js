const express = require('express')
const app = express();

const myroutes = require('./routes/routes.js');
app.use('/', myroutes);

module.exports = app;