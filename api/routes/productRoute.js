const express = require('express');
const router = express.Router();

//get the Controller
const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');
const productController = require('../controllers/productController.js');


/* Create Product Route */
router.route('/product/create/:userId')
    .post(authController.requireSignIn, authController.isAuth, authController.isAdmin, productController.create);



// Find User by ID
router.param('userId', userController.userById);

module.exports = router;