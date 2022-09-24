const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const expressJWT = require("express-jwt");

/* Internal Import */
const {errorHandler} = require('../helper/dbErrorHandle');



 /* Check if the User is AUTHENTICATED */
exports.isAuth = (req, res, next) => {
    // req.profile = checking if there a value exist
    // req.auth = checking if the value is Authenticate
    const user = req.profile && req.auth && req.profile._id == req.auth.id;
    if(!user) {
        return res.status(403).json({
            error: "Access Denied",
        });
    }
    next();
};



/* Check if the user is Admin */
exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin Resourse Access Denied",
        });
    }
    next();
};



/* Require Sign-In Module */
exports.requireSignIn = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: ['auth'],
});



/* SignUp Module */
exports.postSignUp = (req, res, next) => {
    // console.log("In Sign-up");

    const user = new User(req.body);

    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        } else {
            /* After Saving Value need to set this field Undifined */
            user.salt = undefined;
            user.hashedPassword = undefined;

            return res.json({
                user
            });
        }
    });
};



/* Sign-In Module */
exports.postSignIn = (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    User.findOne({email}, (err, user) => {
        // If User not Found
        if (err || !user) {
            return res.status(400).json({
                error: "Email is not Registered."
            });
        }

        // USER VALIDATION from User Model Method 
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email & Password do not Match."
            });
        }

        // GET New Token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); //this will give us a token
        res.cookie('token', token, {expire: new Date() + 9999}); // Save the Token in Cookie and Expire after the given time
        
        const {_id, name, email, role} = user;

        return res.json({
            token,
            user: {
                _id, name, email, role
            }
        })
    });
};