var express = require('express');
var router = express.Router();

router.param('id', function(req, res, next, id) {
	req.id = id;
	next();
    });

/* GET from /users */
router.get('/users/:id', function(req, res) { // id must be 'ObjectId'
	var db = req.db;
	db.users.find({_id : req.id}, function(err, docs) {
		if (!err)
		    res.send(docs);
		    console.log("Successful GET");
		else
		    console.log("Error: " + err);
	    });
    });

module.exports = router;
