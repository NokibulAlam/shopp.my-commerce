const express = require('express');
const router = express.Router();

//get the Controller
const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');
const categoryController = require('../controllers/categoryController.js');


// Create a Category route
router.route('/category/create/:userId')
    .post(authController.requireSignIn, authController.isAuth, authController.isAdmin, categoryController.create);

// Update & Delete Category Route
router.route('/category/:categoryId/:userId')
    .put(authController.requireSignIn, authController.isAuth, authController.isAdmin, categoryController.update)
    .delete(authController.requireSignIn, authController.isAuth, authController.isAdmin, categoryController.delete);


    
// Read a Single Category Data
router.route('/category/:categoryId')
    .get(categoryController.readCategory);



// Read a All Category Data
router.route('/categories')
    .get(categoryController.readAllCategory);

 
    
// Find User by ID
router.param('userId', userController.userById);


// Find Category by ID
router.param('categoryId', categoryController.categoryById);


module.exports = router;