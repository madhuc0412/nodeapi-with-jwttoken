const express = require('express');


const authController = require('../controllers/authController');
const validators = require('../middleware/validation');

const router = express.Router();


// api/auth/Login ===> POST
router.post('/Login', validators.Login, authController.Login);

// api/auth/Signup ====> POST
router.post('/SignUp', validators.SignUp, authController.SignUp);

module.exports = router;
