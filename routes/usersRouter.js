var express = require('express');
var bodyParser = require('body-parser');

var User = require('../models/user');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

//get all users

userRouter.get('/', function(req, res, next) {
    User.find({})
    .then((users)=>{
      console.log(users);
      res.setHeader('Content-Type','application/json');
      res.status(200).json(users);
    },(err)=>{next(err)})
    .catch((err)=>next(err));
});

userRouter.post('/signup',(req,res,next)=>{
    User.create(req.body)
    .then((users)=>{
      console.log('User created :',users);
      res.setHeader('Content-Type','application/json');
      res.status(200).json(users);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = userRouter;
