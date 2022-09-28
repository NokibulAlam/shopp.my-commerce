const express = require('express');
const router = express.Router();

//get the Controller
const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');
const categoryController = require('../controllers/categoryController.js');


router.route('/category/create/:userId')
    .post(authController.requireSignIn, authController.isAuth, authController.isAdmin, categoryController.create);

// Find User by ID
router.param('userId', userController.userById);

module.exports = router;