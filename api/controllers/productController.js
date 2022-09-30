const Product = require('../models/Product');
const formadable = require('formidable'); // For Handling Image Upload; Checking if the user uploading a valid file
const fs = require('fs');
const _lodash = require('lodash'); // For Saving Previous Values

/* Internal Import */
const {errorHandler} = require('../helper/dbErrorHandle');


// Fetch Product ID
exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if(err || !product) {
                return res.status(400).json({
                    error: "Product Not Found"
                });
            }
            req.product = product;
            next();
        });
};


// Create Product
exports.create = (req, res, next) => {
    // Form's All Information will store at thi variable
    const form = new formadable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image upload Error!"
            });
        }

        // Destructuring Data from FORM FIELDS
        const {name, description, price, category, quantity, shipping} = fields;

        // Checking if all the fields are AVAILABLE
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: "All Fields are required!"
            });
        }

        const product = new Product(fields);

        if(files.photo) {
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Photo size should be less than 1MB"
                });
            }

            // Photo read with Syncronize way and Save the Value to Data Colmn 
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type; // Will Save File types

        }
        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            else {
                return res.json(result);
            }
        });
    });
};


// Update Product
exports.update = (req, res, next) => {
    // Form's All Information will store at thi variable
    const form = new formadable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image upload Error!"
            });
        }

        let product = req.product;
        product = _lodash.extend(product, fields); // Current Product and Fields Given by USER

        if(files.photo) {
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Photo size should be less than 1MB"
                });
            }

            // Photo read with Syncronize way and Save the Value to Data Colmn 
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type; // Will Save File types

        }
        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            else {
                return res.json(result);
            }
        });
    });
};


// product Delete Module
exports.delete = (req, res, next) => {
    const product = req.product;

    product.remove((err, result) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        else {
            return res.json({message: "Product Deleted Successfully"});
        }
    });
};


// Read Single Product
exports.readProduct = (req, res, next) => {
    req.product.photo = undefined; // Will handle later; because Photo is in Buffer Data
    return res.json( req.product );
};


// Read All Product
exports.readAllProduct = (req, res, next) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            else{
                return res.send(products);
            }
        });
};


// Read the Photo for SINGLE PRODUCT
exports.getPhoto = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
};


// Get all products Categories
exports.getCategories = (req, res, next) => {
    Product.distinct("category", {}, (err,result) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        return res.json(result);
    });
};


// Get Related Products
exports.getRelatedProducts = (req, res, next) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 2;

    Product.find({_id: {$ne: req.product}, category: req.product.category})
        .limit(limit)
        .populate("category", "_id name")
        .exec((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            return res.send(result);
        })
}