const express = require('express');
const router = express.Router();
const { signupController, signinController } = require('../controllers/auth')
const { signupValidator, signinValidator, validatorResult } = require('../middleware/validator')

router.post('/signup', signupValidator, validatorResult, signupController);
router.post('/signin', signinValidator, validatorResult, signinController);

module.exports = router;
