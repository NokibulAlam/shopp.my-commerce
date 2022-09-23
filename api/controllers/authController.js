const User = require('../models/Users');

exports.postSignUp = (req, res, next) => {
    // console.log("In Sign-up");

    const user = new User(req.body);

    user.save((err, result) => {
        if(err) {
            return err;
        }
        else {
            user.salt = undefined;
            user.hashedPassword = undefined;

            return res.json({user});
        }
    });
};