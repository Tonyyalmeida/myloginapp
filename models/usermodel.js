var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
//Declaring a user Model
//
//password local for local strategy

var exports = module.exports = {};
var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
});

//var UserModel = exports.UserModel = mongoose.model("UserModel", UserSchema) 

//var UserModel = mongoose.model('UserModel', UserSchema);
exports.UserModel = mongoose.model('UserModel', UserSchema);
//UserModel = mongoose.model('UserModel', UserSchema);

//UserModel = mongoose.model("UserModel", UserSchema);
//module.exports = UserModel;

exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	UserModel.findOne(query, callback);
}
//module.exports = getUserByUsername;

exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
//module.exports = comparePassword;
//taken Straight from bcrypt docs
exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}
//this function is called on "User" -> That's why it's saved
//module.exports = createUser;

exports.showAll = function (req, res) {
UserModel.find({}, function (err, data) {
if (err) throw err;
res.json(data);
});
};

//module.exports = showAll;