const Product = require('../models/Product');
const formadable = require('formidable'); // For Handling Image Upload; Checking if the user uploading a valid file
const fs = require('fs');

/* Internal Import */
const {errorHandler} = require('../helper/dbErrorHandle');



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