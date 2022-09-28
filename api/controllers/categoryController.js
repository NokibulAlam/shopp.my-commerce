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
            return res.json({result});
        }
    })
}