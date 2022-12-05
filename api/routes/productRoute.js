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
    .delete(authController.requireSignIn, authController.isAuth, authController.isAdmin, productController.delete);


// Read Single Data
router.route('/product/:productId')
    .get(productController.readProduct);


// Read All Product Data
router.route('/products')
    .get(productController.readAllProduct);


// Get the Product Photo
router.route('/product/photo/:productId')
    .get(productController.getPhoto);


// Get All Categoris
router.route('/products/categories')
    .get(productController.getCategories);


// Get Related Product
router.route('/products/related/:productId')
    .get(productController.getRelatedProducts);


// Product Filter Route
router.route('/product/by/search')
    .post(productController.filterProduct);

// Product Search Route
router.route('/products/search')
    .get(productController.searchProduct);


// Find Product by ID
router.param('productId', productController.productById);


// Find User by ID
router.param('userId', userController.userById);


module.exports = router;