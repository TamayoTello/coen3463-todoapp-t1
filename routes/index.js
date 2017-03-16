var express = require('express');
var passport = require('passport');
var Account = require('../models/user-schema');
var router = express.Router();

//Home Page
router.get('/', function (req, res)
 {

    if(req.user)
     {
        res.render('index', { user : req.user,
                              title: "To-Do List"
                            });
     }
    else
     {
        res.render('login', { title: 'Login : To-Do List' });
     }

 });

//Register New Account
router.get('/register', function(req, res)
 {
    res.render('register', { user : req.user,
                             title: "Register : To-Do List" 
                           });
 });
router.post('/register', function(req, res)
 {

    var newUser = { username: req.body.username,
                    email: req.body.email,
                    firstName: req.body.firstname,
                    lastName: req.body.lastname
                  }

    Account.findOne({username: newUser.username}, function(err, getUsername){
    if(!getUsername) {
      Account.register(new Account(newUser), req.body.password, function(err, account){
        if (err)
         {
            res.render('register', {  title: "Register || To-Do List",
                                      errorRegistration: 'Oops! Something went wrong. Try again!',
                                   });
         }

        passport.authenticate('local')(req, res, function ()
         {
            res.redirect('/');
         });
      });
    }
    else {

      res.render('register', {  errorRegistration: 'Username already exists!',
                                title: "Register || To-Do List"
                             });
    }
  });
 });


//Login Account
router.get('/login', function(req, res)
 {
    res.render('login', { user : req.user,
                          title: "Login || To-Do List" 
                        });
 });
router.post('/login', function(req, res, next)
 {
    passport.authenticate('local', function(err, user)
     {
        req.logIn(user, function(err)
         {
            if(!err)
             {
                res.redirect('/');
                console.log('Login success!');
             }
            else
             {
                res.render('login', { errorLogin: 'Invalid Username or Password!',
                                      title: "Login || To-Do List"
                                    });
                res.end(err);
                 }
         });

     })(req, res, next);
 });

//Logout Account
router.get('/logout', function(req, res)
 {
    req.logout();
    res.redirect('/');
 });

module.exports = router;