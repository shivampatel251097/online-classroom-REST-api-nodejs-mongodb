var express = require('express');
var bodyParser = require('body-parser');

var Student = require('../models/student');

var studentRouter = express.Router();
studentRouter.use(bodyParser.json());

//Get all students 
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
    .then((student)=>{
        if(student){
            res.status(404).end("Student Profile already created. Please update for any changes!!");
        }
        Student.create(req.body)
        console.log(req.body)
        res.status(200).json("students profile created successfully");
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.put((req,res,next)=>{
    res.status(404).end("PUT operation not supoorted on this route!");
})

//This should not be used as it will delete all the entry in student table
.delete((re,res,next)=>{
    Student.remove({})
    .then((deletedmessage)=>{
        res.setHeader('Content-Type','application/json');
        res.status(200).json(deletedmessage);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

//Routes with params as studentID
studentRouter.route('/:studentID')
.get((req,res,next)=>{
    Student.findById(req.params.studentID)
    .then((student)=>{
        console.log("std",student);
        if(student!=null){
            res.setHeader('Content-Type','application/json');
            res.status(200).json(student);
        }
        else{
            var err = new Error("No Student found with the ID!");
            err.status = 404;
            return next(err);
        }
        
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.put((req,res,next)=>{
    Student.findByIdAndUpdate(req.params.studentID,{$set:req.body},{new:true})
    .then((student)=>{
        console.log("student",student);
        res.setHeader('Content-Type','application/json');
        res.status(200).json(student);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.delete((req,res,next)=>{
    Student.findById(req.params.studentID)
    .then((student)=>{
        if(student == null){
            res.status(404).end("No Student found with the ID!!");
        }
        else{
            student.remove();
            res.status(200).end("Student with ID "+req.params.studentID+ " is deleted!");
        }
    },(err)=>next(err))
    .catch((err)=> next(err));
})

module.exports = studentRouter;
