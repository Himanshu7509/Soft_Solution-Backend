const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const {
  submitQuoteRequest,
  getAllQuotes,
  updateQuoteStatus
} = require('../controllers/quote.controller');

const router = express.Router();

// Public route
router.route('/').post(
  [
    body('name', 'Name is required').not().isEmpty(),
    body('phone', 'Please include a valid phone number').isMobilePhone(),
    body('loanAmount', 'Loan amount is required').isNumeric(),
    body('loanType', 'Loan type is required').not().isEmpty()
  ],
  submitQuoteRequest
);

// Admin routes
router.use(protect);
router.use(authorize('admin'));

router.route('/').get(getAllQuotes);
router.route('/:id').put(
  [
    body('status', 'Status is required').not().isEmpty()
  ],
  updateQuoteStatus
);

module.exports = router;