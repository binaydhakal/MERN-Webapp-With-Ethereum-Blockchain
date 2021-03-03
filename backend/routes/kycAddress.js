const { Router } = require('express');
const express = require('express');
const { authenticatateJWT } = require('../middleware/authenticator');
const router = express.Router();
const kycAddressController = require('../controllers/kycAddress')

router.post('/', authenticatateJWT, kycAddressController.createAddress);
router.get('/', authenticatateJWT, kycAddressController.readAddress);

module.exports = router;