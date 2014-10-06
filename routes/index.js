var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
//  res.render('index', { title: 'Express' });
  res.send({'Hello': 'World'});
});

router.param('id', function(req, res, next, id) {
  req.id = id;
  next();
});

/* GET json doc by id from database */
router.get('/resources/:id', function(req, res) { //id must be 'ObjectId'
//  console.log(req.param.id);
  
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({_id : req.id},function(e,docs){
    res.send(docs);
  });
  
//  res.send(req.id);
});

/* POST json doc to /../resources */
router.post('/resources/:id', function(req,res){
//  res.send(req.body);
  var db = req.db;
  var collection = db.get('usercollection');
  var ID = Number(req.id);  
  collection.insert({_id : ID, thingtopost : req.body});
  res.send(req.id);
});

/* DELETE json doc from resources 
router.delete('/resources/:id', function(req,res){
  var db = req.db;
  var collection = db.get('usercollection');
  collection.remove({});
  db.collection.remove({});
}); */

module.exports = router;
