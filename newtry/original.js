var express = require('express');
var path = require('path');


var dburl = 'localhost/mongoapp';
var collections = ['users'];
var db = require('mongojs').connect(dburl, collections);

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