var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
res.render("login", {loginactive: true, title: "Login"});    
});

router.post("/", function (req, res) {
	var username = req.body.username;
    var password1 = req.body.password1;
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password1', 'Password is required').notEmpty();
    // what íf password is not correct
	var errors = req.validationErrors(); // an array of objects
	if(errors){
		res.render("login", {errors: errors});
		// here just don't use template engine, but return error API
		}
	else {
res.render("about", {text: username + " you are logged in"});
		}});
		// here return successfull login
module.exports = router;