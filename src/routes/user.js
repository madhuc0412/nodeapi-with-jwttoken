const express = require('express');


const userController = require('../controllers/userController');
const validators = require('../middleware/validation');

const isAuth = require('../middleware/is-Auth');

const router = express.Router();


// api/User/GetUsers ===> GET     //Token is required
router.get('/GetUsers', isAuth, userController.GetUsers);


module.exports = router;
