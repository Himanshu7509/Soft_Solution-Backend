const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middlewares/auth.middleware');
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller');

const router = express.Router();

// Protect all routes below this middleware
router.use(protect);

// @route   GET /api/users/profile
router.route('/profile').get(getUserProfile);

// @route   PUT /api/users/profile
router.route('/profile').put(
  [
    body('fullName', 'Full name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('phone', 'Please include a valid phone number').isMobilePhone(),
    body('dob', 'Please include a valid date of birth').optional().isISO8601()
  ],
  updateUserProfile
);

module.exports = router;