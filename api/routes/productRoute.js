const express = require('express');
const router = express.Router();

//get the Controller
const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');
const productController = require('../controllers/productController.js');


/* Create Product Route */
router.route('/product/create/:userId')
    .post(authController.requireSignIn, authController.isAuth, authController.isAdmin, productController.create);


// Product Update Route
router.route('/product/:productId/:userId')
    .put(authController.requireSignIn, authController.isAuth, authController.isAdmin, productController.update)
    .delete(authController.requireSignIn, authController.isAuth, authController.isAdmin, productController.delete)

// Find Product by ID
router.param('productId', productController.productById);

// Find User by ID
router.param('userId', userController.userById);



module.exports = router;