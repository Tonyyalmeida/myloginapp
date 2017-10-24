var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('../models/usermodel');

router.get("/", function (req, res) {
res.render("login", {loginactive: true, title: "Login"});    
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   UserModel.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}
   	UserModel.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));




//continue right here

// router.post("/", function (req, res) {
// 	var username = req.body.username;
//     var password1 = req.body.password1;
// 	req.checkBody('username', 'Username is required').notEmpty();
// 	req.checkBody('password1', 'Password is required').notEmpty();
//     // what íf password is not correct
// 	var errors = req.validationErrors(); // an array of objects
// 	if(errors){
// 		res.render("login", {errors: errors});
// 		// here just don't use template engine, but return error API
// 		}
// 	else {
// res.render("about", {text: username + " you are logged in"});
// 		}});

		// here return successfull login
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// router.post('/',
//   passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
//   function(req, res) {
//     res.redirect('/');
//   });

router.post('/',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
		res.render("about", {text: req.user + "is logged in"});
  });


module.exports = router;