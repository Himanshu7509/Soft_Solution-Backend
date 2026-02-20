const Application = require('../models/application.model');
const User = require('../models/user.model');
const Loan = require('../models/loan.model');

// @desc    Apply for loan
// @route   POST /api/applications
// @access  Private
const applyForLoan = async (req, res) => {
  try {
    const {
      loanAmount,
      loanType,
      tenureYears,
      monthlyIncome,
      fullName,
      phone,
      email,
      dob,
      address
    } = req.body;

    const application = await Application.create({
      user: req.user._id,
      loanAmount,
      loanType,
      tenureYears,
      monthlyIncome,
      fullName,
      phone,
      email,
      dob,
      address
    });

    res.status(201).json({
      success: true,
      message: 'Loan application submitted successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's loan applications
// @route   GET /api/applications/my
// @access  Private
const getUserApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const applications = await Application.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Application.countDocuments({ user: req.user._id });

    res.status(200).json({
      success: true,
      count: applications.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all loan applications
// @route   GET /api/applications
// @access  Private/Admin
const getAllApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Add search functionality
    let filter = {};
    if (req.query.search) {
      filter.$or = [
        { fullName: { $regex: req.query.search, $options: 'i' } },
        { phone: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { loanType: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Add filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Add filter by loan type
    if (req.query.loanType) {
      filter.loanType = req.query.loanType;
    }

    const applications = await Application.find(filter)
      .populate('user', 'fullName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Application.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: applications.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get application by ID
// @route   GET /api/applications/:id
// @access  Private/Admin
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      'user',
      'fullName email'
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private/Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const allowedStatuses = ['pending', 'approved', 'rejected', 'under-review'];
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Allowed statuses are: pending, approved, rejected, under-review'
      });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private/Admin
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Admin dashboard analytics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalLoans = await Loan.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalApproved = await Application.countDocuments({ status: 'approved' });
    const totalPending = await Application.countDocuments({ status: 'pending' });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalLoans,
        totalApplications,
        totalApproved,
        totalPending
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  applyForLoan,
  getUserApplications,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getAdminDashboard
};