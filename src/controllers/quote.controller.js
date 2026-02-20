const Quote = require('../models/quote.model');

// @desc    Submit quote request
// @route   POST /api/quotes
// @access  Public
const submitQuoteRequest = async (req, res) => {
  try {
    const { name, phone, loanAmount, loanType } = req.body;

    const quote = await Quote.create({
      name,
      phone,
      loanAmount,
      loanType
    });

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully',
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all quote requests
// @route   GET /api/quotes
// @access  Private/Admin
const getAllQuotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Add search functionality
    let filter = {};
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { phone: { $regex: req.query.search, $options: 'i' } },
        { loanType: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Add filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const quotes = await Quote.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Quote.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: quotes.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: quotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update quote status
// @route   PUT /api/quotes/:id
// @access  Private/Admin
const updateQuoteStatus = async (req, res) => {
  try {
    const allowedStatuses = ['pending', 'contacted', 'approved', 'rejected'];
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Allowed statuses are: pending, contacted, approved, rejected'
      });
    }

    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quote status updated successfully',
      data: quote
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  submitQuoteRequest,
  getAllQuotes,
  updateQuoteStatus
};