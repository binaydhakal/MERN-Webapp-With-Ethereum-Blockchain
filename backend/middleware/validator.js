const {
    check, validationResult
} = require('express-validator');

exports.signupValidator = [
    check('username')
    .not().isEmpty()
    .trim()
    .withMessage('All feilds required'),
    check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email'),
    check('phonenumber')
    .not().isEmpty()
    .trim()
    .isLength({
        min: 10
    })
    .withMessage('Phone number digit are incomplete'),  
    check('password')
    .isLength({
        min: 5
    })
    .withMessage('Password must be at least 6 characters long')
];

exports.signinValidator = [
    check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email'), 
    check('password')
    .isLength({
        min: 5
    })
    .withMessage('Password must be at least 6 characters long')
];

exports.validatorResult = (req, res, next) => {
    
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        const firstError = result.array()[0].msg;
        
        return res.status(400).json({
            errorMessage: firstError,
        });
    }

    next();
}