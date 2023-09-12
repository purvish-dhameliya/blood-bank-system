const express = require('express');
const { registerController, loginController, currentUserController } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

//register api route
router.post("/register", registerController)

//login api
router.post('/login', loginController)

// get user
router.get("/current-user", authMiddleware, currentUserController)


module.exports = router;