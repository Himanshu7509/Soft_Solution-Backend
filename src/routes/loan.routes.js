const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
  toggleLoanStatus
} = require('../controllers/loan.controller');

const router = express.Router();

// Public routes
router.route('/').get(getAllLoans);
router.route('/:id').get(getLoanById);

// Admin routes
router.use(protect);
router.use(authorize('admin'));

router.route('/').post(
  [
    body('title', 'Loan title is required').not().isEmpty(),
    body('description', 'Loan description is required').not().isEmpty(),
    body('interestRate', 'Interest rate is required').isNumeric(),
    body('processingFee', 'Processing fee is required').isNumeric(),
    body('maxAmount', 'Maximum amount is required').isNumeric(),
    body('minAmount', 'Minimum amount is required').isNumeric(),
    body('tenureOptions', 'Tenure options are required').isArray()
  ],
  createLoan
);

router.route('/:id')
  .put(
    [
      body('title').optional(),
      body('description').optional(),
      body('interestRate').optional().isNumeric(),
      body('processingFee').optional().isNumeric(),
      body('maxAmount').optional().isNumeric(),
      body('minAmount').optional().isNumeric(),
      body('tenureOptions').optional().isArray()
    ],
    updateLoan
  )
  .delete(deleteLoan);

router.route('/toggle/:id').put(toggleLoanStatus);

module.exports = router;