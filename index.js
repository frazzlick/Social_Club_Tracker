const express = require('express')
const app = express();

const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.urlencoded({ extended: false }));
const myroutes = require('./routes/routes_prod.js');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}))
app.use('/', myroutes);


module.exports = app;