const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const {
  submitContactForm,
  getAllContacts,
  deleteContact
} = require('../controllers/contact.controller');

const router = express.Router();

// Public route
router.route('/').post(
  [
    body('fullName', 'Full name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('phone', 'Please include a valid phone number').isMobilePhone(),
    body('message', 'Message is required').not().isEmpty()
  ],
  submitContactForm
);

// Admin routes
router.use(protect);
router.use(authorize('admin'));

router.route('/').get(getAllContacts);
router.route('/:id').delete(deleteContact);

module.exports = router;