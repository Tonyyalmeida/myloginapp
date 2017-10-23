var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');

//check out flash mesages + general messages
//session + req.logout are taken care of by Middleware
//secret = salt for hasing, rest are standard settings for coockies
//module export pattern -> done
//done function part of passport js, their first parameter is the error function (thats why its null)

//check how app.locals works
//Next step: Start with login!


mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('Successfully connected to database');
});



var home = require("./routes/index");
var about = require("./routes/about");
var register = require("./routes/register");
var login = require("./routes/login");
var app = express();


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Standard Elements
app.use(cookieParser());
//validator
// Express Validator
//straight from GITHUB
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//View engine
app.set('views', path.join(__dirname, 'views')); //set Folder Views
app.engine('handlebars', exphbs({defaultLayout:'mylayout'})); //select handlebars and default layout
app.set('view engine', 'handlebars');

// var routes = require('./routes/index');
// var users = require('./routes/users');

var UserModel = require('./models/usermodel');
var UserM = UserModel.UserModel;
app.use("/all", function (req, res) {
UserM.find({}, function (err, data) {
if (err) throw err;
res.json(data);
});})

//set folder for static files
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.favicon());
app.use(favicon(path.join(__dirname,'public/favicon.ico')));

//Using routes can help you define routes after a certain parameter that can be reused
//like about/me or about/you...
app.use("/about", about);
app.use("/", home);
app.use("/register", register);
app.use("/login", login);

// app.get("/", function (req, res) {
// res.render("index", {homeactive: true});    
// })

// app.get("/about", function (req, res) {
// res.render("about", {aboutactive: true});
// })

// Global Vars
// req. user is true when somebody is logged in.

// app.locals are set forever
// req.locals only for one request
// 
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// router.get('/', ensureAuthenticated, function(req, res){
// 	res.render('index');
// });

// Set Port
app.listen(3092, function () {
  console.log('Example app listening on port 3092!')
});