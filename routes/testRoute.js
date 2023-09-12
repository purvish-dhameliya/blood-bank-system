const express = require('express');
const { testController } = require('../controller/testController');
const router = express.Router();

router.get("/", testController)

module.exports = router;