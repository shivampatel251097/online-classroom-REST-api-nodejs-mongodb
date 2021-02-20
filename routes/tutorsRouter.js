var express = require('express');
var bodyParser = require('body-parser');

var Tutor = require('../models/tutor');

var tutorRouter = express.Router();
tutorRouter.use(bodyParser.json());

tutorRouter.route('/')
.get((req, res, next)=> {
    Tutor.find({})
    .then((tutors)=>{
      console.log(tutors);
      res.setHeader('Content-Type','application/json');
      res.status(200).json(tutors);
    },(err)=>{next(err)})
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    Tutor.findById(req.body._id)
    .then((tutor)=>{
        if(tutor){
            res.status(404).end("Tutor Profile already created. Please update for any changes!!");
        }
        Tutor.create(req.body)
        res.status(200).json("Tutor profile created successfully with ID:"+req.body._id+".");
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.put((req,res,next)=>{
    res.status(404).end("PUT operation not supoorted on this route!");
})

//This should not be used as it will delete all the entry in student table
.delete((re,res,next)=>{
    Tutor.remove({})
    .then((deletedmessage)=>{
        res.setHeader('Content-Type','application/json');
        res.status(200).json(deletedmessage);
    },(err)=>next(err))
    .catch((err)=>next(err));
})


//Routes with params as tutorID
tutorRouter.route('/:tutorID')
.get((req,res,next)=>{
    Tutor.findById(req.params.tutorID)
    .then((tutor)=>{
        console.log("std",tutor);
        if(tutor!=null){
            res.setHeader('Content-Type','application/json');
            res.status(200).json(tutor);
        }
        else{
            var err = new Error("No Tutor found with the ID!");
            err.status = 404;
            return next(err);
        }
        
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    res.status(404).end("POST operation not supoorted on this route!");
})

.put((req,res,next)=>{
    Tutor.findByIdAndUpdate(req.params.tutorID,{$set:req.body},{new:true})
    .then((tutor)=>{
        console.log("Tutor",tutor);
        res.setHeader('Content-Type','application/json');
        res.status(200).json(tutor);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.delete((req,res,next)=>{
    Tutor.findById(req.params.tutorID)
    .then((tutor)=>{
        if(tutor == null){
            res.status(404).end("No Tutor found with the ID!!");
        }
        else{
            tutor.remove();
            res.status(200).end("Tutor with ID "+req.params.tutorID+ " is deleted!");
        }
    },(err)=>next(err))
    .catch((err)=> next(err));
})

module.exports = tutorRouter;