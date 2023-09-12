const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { bloodGroupDetailsController } = require('../controller/analyticsController');
var router = express.Router()

router.get('/bloodGroup-data', authMiddleware, bloodGroupDetailsController);

module.exports = router;