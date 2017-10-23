var express = require('express');
var router = express.Router();
var UserModel = require('../models/usermodel');

router.get("/", function (req, res) {
res.render("registration", {registeractive: true, title: "Registration"});    
});

router.post("/", function (req, res) {
	var email = req.body.email;
    var username = req.body.username;
    var password1 = req.body.password1;
    var password2 = req.body.password2;
	req.checkBody('username', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password1', 'Password is required').notEmpty();
	req.checkBody('password1', 'Password should be at least 8 characters long').isLength({min: 2, max: 30});
    req.checkBody('password2', 'Please repeat the password').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password1);
    	var errors = req.validationErrors(); // an array of objects
	if(errors){
		res.render("registration", {errors: errors});
		}
	else {
var UserM = UserModel.UserModel;		
var newUser = new UserM({
			email:email,
			username: username,
			password: password1
		});
		UserModel.createUser(newUser, function(err, user){
			if(err) throw err;
		});
		res.render("about", {text: username + " have registered"});
		// whats is the avantage of using redirect? 
		}});

module.exports = router;


