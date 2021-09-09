const express = require('express')
const app = express();

const myroutes = require('./routes/routes.js');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}))
app.use('/', myroutes);

module.exports = app;