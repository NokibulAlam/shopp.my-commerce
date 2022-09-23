const express = require('express');
const router = express.Router();

//get the Controller
const authController = require('../controllers/authController.js');

router.route('/signup')
    .post(authController.postSignUp)



module.exports = router;