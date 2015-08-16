var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Get Hello World page */
router.get('/helloworld', function (req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* Get UserList page*/
router.get('/userlist', function (req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function (e, docs) {
        res.render('userlist', {
            "userlist": docs
        });
    });
});

/* Get New User page */
router.get('/newuser', function (req, res) {
    res.render('newuser', { title: 'Add New User' });
});

// POST to Add User Service
router.post('/adduser', function (req, res) {
    // set internal db variable
    var db = req.db;

    // get form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set collection
    var collection = db.get('usercollection');

    // submit to the DB
    collection.insert({
        "username": userName,
        "email": userEmail
    }, function (err, doc) {
        if (err) {
            // return error if it failed
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;
