var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
res.render("about", {aboutactive: true, title: "About"});
})

router.get("/me", function(req, res) {
res.json({hi: "This is it"})
})
module.exports = router;