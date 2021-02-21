var express = require('express');
var bodyParser = require('body-parser');

var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
var userRouter = express.Router();
userRouter.use(bodyParser.json());

//get all users

userRouter.get('/',authenticate.verifyUser, function(req, res, next) {
  console.log('Req.session',req.session);
    User.find({})
    .then((users)=>{
      console.log(users);
      res.setHeader('Content-Type','application/json');
      res.status(200).json(users);
    },(err)=>{next(err)})
    .catch((err)=>next(err));
});

// userRouter.post('/signup',(req,res,next)=>{
//     User.create(req.body)
//     .then((users)=>{
//       console.log('User created :',users);
//       res.setHeader('Content-Type','application/json');
//       res.status(200).json(users);
//     },(err)=>next(err))
//     .catch((err)=>next(err));
// });

//route for sign up
userRouter.post('/signup', (req,res,next) => {
  User.register(new User({username: req.body.username}),
   req.body.password, (err,user)=>{
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type','application/json');
      res.json({err: err});
    }
    else{
      if(req.body.firstname){
        user.firstname = req.body.firstname;
      }
      if(req.body.lastname){
        user.lastname = req.body.lastname;
      }
      if(req.body.role){
        user.role = req.body.role;
      }
      user.save((err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type','application/json');
          res.json({err: err});
          return;
        }
        passport.authenticate('local')(req,res, ()=>{
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json({success: true, status: 'User Sign up Successful!'});
        });
      });
    }
  });
  });

  userRouter.post('/login',passport.authenticate('local'),(req,res,next)=>{
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({success: true, token:token, status: 'Successfully Logged in'});
  });

module.exports = userRouter;
