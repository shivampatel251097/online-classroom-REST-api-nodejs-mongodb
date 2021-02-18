var express = require('express');
var bodyParser = require('body-parser');

var Student = require('../models/student');

var studentRouter = express.Router();
studentRouter.use(bodyParser.json());

/* GET users listing. */
studentRouter.route('/')
.get((req, res, next)=> {
    Student.find({})
    .then((students)=>{
      console.log(students);
      res.setHeader('Content-Type','application/json');
      res.status(200).json(students);
    },(err)=>{next(err)})
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    Student.findById(req.body._id)
    .then((students)=>{
        if(students){
            return next(new Error("Student Profile already created. Please update for any changes!!"));
        }
        Student.create(req.body)
        console.log(req.body)
        res.status(200).json("students profile created successfully");
    },(err)=>next(err))
    .catch((err)=>next(err));
})

module.exports = studentRouter;
