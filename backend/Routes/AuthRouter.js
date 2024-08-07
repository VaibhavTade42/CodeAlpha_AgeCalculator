const express = require('express');
const router = express.Router(); // Correctly initializing the router

const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

// Define your routes here
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;
