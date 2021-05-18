const express = require('express');
const router = express.Router();
const controller = require('../controllers/heartRateRecords');
const auth = require('../middleware/verifyToken');

router.post('/', auth, controller.index);
router.get('/', auth, controller.getHeartRate);

module.exports = router;