if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
};

const url = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false'


const port = process.env.PORT || 4005;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('routes'));

const initalisePassport = require('./login/passport-config');
const { minify } = require('uglify-js');
initalisePassport(
    passport, 
    email => users.find(user => user.email === email),
    _id => users.find(user => user._id == _id)
);

let users = [];

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
// app.use(bodyParser.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.html');
});

app.get('/register', checkNotAuthenticated, (req, res)=> {
    res.render('register.html');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));


app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/index')
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

function devAuthenticated(req, res, next)
{
    next()
}


app.listen(port);


require('./webpages')(app, devAuthenticated);
require('./dataquery')(app, devAuthenticated, checkNotAuthenticated, url, bcrypt, users);

module.exports = app;