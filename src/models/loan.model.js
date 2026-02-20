const mongoose = require('mongoose');
const slugify = require('slugify');

const loanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Loan title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, 'Loan description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    interestRate: {
      type: Number,
      required: [true, 'Interest rate is required'],
      min: [0, 'Interest rate cannot be negative'],
      max: [100, 'Interest rate cannot exceed 100%']
    },
    processingFee: {
      type: Number,
      required: [true, 'Processing fee is required'],
      min: [0, 'Processing fee cannot be negative']
    },
    maxAmount: {
      type: Number,
      required: [true, 'Maximum amount is required'],
      min: [0, 'Maximum amount cannot be negative']
    },
    minAmount: {
      type: Number,
      required: [true, 'Minimum amount is required'],
      min: [0, 'Minimum amount cannot be negative']
    },
    tenureOptions: {
      type: [Number], // Array of available tenure options in years
      required: [true, 'Tenure options are required'],
      validate: {
        validator: function(v) {
          return v && v.length > 0;
        },
        message: 'At least one tenure option is required'
      }
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

// Generate slug before saving
loanSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Loan', loanSchema);