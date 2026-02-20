const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/auth.controller');

const router = express.Router();

// @route   POST /api/auth/register
router.post(
  '/register',
  [
    body('fullName', 'Full name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('phone', 'Please include a valid phone number').isMobilePhone(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  registerUser
);

// @route   POST /api/auth/login
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  loginUser
);

module.exports = router;