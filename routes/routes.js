if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
};

const url = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false'

const port = process.env.PORT || 4000;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const initalisePassport = require('./passport-config');
const { minify } = require('uglify-js');

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('routes'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))