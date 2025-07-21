const express = require('express');
const router = express.Router();
const { loginUser, registerUser, googleLogin } = require('../controllers/userController');


//Register route
router.post('/register', registerUser);

//Login route
router.post('/login', loginUser);

//google route
router.post('/google', googleLogin);


module.exports = router;
