const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const {
  applyForLoan,
  getUserApplications,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getAdminDashboard
} = require('../controllers/application.controller');

const router = express.Router();

// Customer routes (protected)
router.use(protect);

router.route('/').post(
  [
    body('loanAmount', 'Loan amount is required').isNumeric(),
    body('loanType', 'Loan type is required').not().isEmpty(),
    body('tenureYears', 'Tenure in years is required').isNumeric(),
    body('monthlyIncome', 'Monthly income is required').isNumeric(),
    body('fullName', 'Full name is required').not().isEmpty(),
    body('phone', 'Please include a valid phone number').isMobilePhone(),
    body('email', 'Please include a valid email').isEmail(),
    body('dob', 'Date of birth is required').isISO8601()
  ],
  applyForLoan
);

router.route('/my').get(getUserApplications);

// Admin routes
router.use(authorize('admin'));

router.route('/').get(getAllApplications);
router.route('/:id')
  .get(getApplicationById)
  .put(
    [
      body('status', 'Status is required').not().isEmpty()
    ],
    updateApplicationStatus
  )
  .delete(deleteApplication);

// Admin dashboard route
router.route('/admin/dashboard').get(getAdminDashboard);

module.exports = router;