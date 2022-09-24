const express = require('express');
const router = express.Router();


//get the Controller
const authController = require('../controllers/authController.js');


// Validators
const userValidator = require('../validator/userValidator');


/* User Signup Routing */
router.route('/signup')
    .post(userValidator.userSignupValidator, authController.postSignUp);


router.route('/signin')
    .post(authController.postSignIn)



module.exports = router;