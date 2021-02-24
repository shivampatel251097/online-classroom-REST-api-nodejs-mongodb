var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

var User = require('./models/user');
var config = require('./config');

//Process to sign and create JWT Token
exports.local = passport.use(new LocalStrategy(User.authenticate()));

//serialize and deserialize user is used to store info of logged in user in req.session 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//getting of token after logging in
exports.getToken = function(user){
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
}

//JWT Strategy Creation and Verification of user if JWT is valid or not 
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

//This handler verifies the token for every route in which we are using authenticate.verifyUser function
exports.jwtPassport = passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    console.log("JWT payload:", jwt_payload);
    User.findOne({_id: jwt_payload._id},(err,user) =>{
        if(err){
            return done(err,false);
        }
        else if(user){
            return done(null,user);
        }
        else{
            return done(null,false)
        }
    });
}));

exports.verifyUser  = passport.authenticate('jwt',{session: false});

