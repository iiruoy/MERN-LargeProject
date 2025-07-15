const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/userController');


//Register route
router.post('/register', registerUser);

//Login route
router.post('/login', loginUser);


module.exports = router;
