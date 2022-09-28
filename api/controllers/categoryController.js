const Category = require('../models/Category');

/* Internal Import */
const {errorHandler} = require('../helper/dbErrorHandle');

exports.create = (req, res, next) => {
    const category = new Category(req.body);

    category.save( (err, result) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        else{
            return res.json(result);
        }
    });
};


// Find Category By ID Param
exports.categoryById = (req, res, next, id) => {
    Category.findById(id)
        .exec((err, category) => {
            if(err || !category) {
                return res.status(400).json({
                    error: "Category Not Found"
                });
            }
            req.category = category;
            next();
        });
};

// Update the Category
exports.update = (req, res, next) => {
    const category = req.category;
    category.name = req.body.name;
    // console.log(category, category.name);

    category.save( (err, result) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        else{
            return res.json(result);
        }
    });
};


// Delete the Category
exports.delete = (req, res, next) => {
    const category = req.category;

    category.remove((err, result) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        else{
            return res.json({message: "Category Delete Successful"});
        }
    });
};

// Read a Single Category Data
exports.readCategory = (req, res, next) => {
    return res.json( req.category);
};


// Read a All Category Data
exports.readAllCategory = (req, res, next) => {

    Category.find()
        .exec((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            else {
                return res.json(result);
            }
        })
};
