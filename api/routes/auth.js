const express = require('express');
const router = express.Router();

//get the Controller
const authController = require('../controllers/authController.js');


// Validators
const userValidator = require('../validator/userValidator');

router.route('/signup')
    .post(userValidator.userSignupValidator, authController.postSignUp)



module.exports = router;