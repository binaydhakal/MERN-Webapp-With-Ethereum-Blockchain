const { Router } = require('express');
const express = require('express');
const { authenticatateJWT } = require('../middleware/authenticator');
const upload = require('../middleware/multer');
const router = express.Router();
const kycController = require('../controllers/kyc')

router.post('/', authenticatateJWT, upload.fields([{name: 'pp'}, {name: 'front'}, {name: 'back'}]), kycController.create);
router.get('/', authenticatateJWT, kycController.read);


module.exports = router;