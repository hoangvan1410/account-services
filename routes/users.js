const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const signValidation = require('../middleware/validation');


router.post('/signup', signValidation, controller.signup);

router.post('/login', signValidation, controller.login);

module.exports = router;