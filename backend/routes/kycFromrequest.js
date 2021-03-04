const { Router } = require('express');
const express = require('express');
const { authenticatateJWT } = require('../middleware/authenticator');
const router = express.Router();
const kycFromrequestController = require('../controllers/kycFromrequest')

router.post('/', authenticatateJWT, kycFromrequestController.create);



module.exports = router;