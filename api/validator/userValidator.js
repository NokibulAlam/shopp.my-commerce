
exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Name is Required").notEmpty();

    req.check("email", "Email must be 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email Must Contain @")
        .isLength({
            min: 4,
            max: 32
        });


    req.check("password", "Password is Required").notEmpty();
    
    req.check("password")
        .isLength({
            min: 6
        })
        .withMessage("Password must be at least 6 characters long")
        .matches(/\d/)
        .withMessage("Password mush contain a number");


    const errors = req.validationErrors();

    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError });
    }
    
    next();
};