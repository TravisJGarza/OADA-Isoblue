#! /usr/bin/env node

var debug = require('debug')//('nodetest2');
   //var app = require('../app');

// Require some things and create app variable
var express = require('express');
var path = require('path');
var app = express();

// Set port for app.js program
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
	debug('Express server listening on port ' + server.address().port);
    });

// Setup mongodb connection using mongojs
var dburl = 'localhost/mongoapp';
var collections = ['users'];
var db = require('mongojs').connect(dburl, collections);

// Use ./routes/index.js for stuff
var routes = require('./routes/index');
// Make db accessible to our router
app.use(function(req,res,next){
	req.db = db;
	next();
    });
app.use('/', routes);

// Tutorial started here
function user(firstname, lastname, email) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
}

db.users.ensureIndex({email:1}, {unique : true});

var user1 = new user("Phillip", "Fry", "phillip@fry.com");
db.users.save(user1, function(err, savedUser) {
	if (err || !savedUser) console.log("User" + user.email + "not saved:" + err);
	else console.log("User " + savedUser.email + " saved");
});

var user2 = new user("Phillip", "Fry", "phillip@fry.com");
db.users.save(user2, function(err, savedUser) {
        if (err || !savedUser) console.log("User" + user.email + "not saved:" + err);
        else console.log("User " + savedUser.email + " saved");
    });

db.users.find(user1, function(err, users) {
	if (err || !users.length) console.log("User " + user.email + " not found.");
	else users.forEach( function(user) {
		console.log("User Found! - " + user);
	    });
    });

module.exports = app;