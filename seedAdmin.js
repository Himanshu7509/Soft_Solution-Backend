const mongoose = require('mongoose');
const User = require('./src/models/user.model');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create default admin user with credentials from environment variables
    const adminUser = await User.create({
      fullName: 'Admin User',
      email: process.env.ADMIN_EMAIL ,
      phone: '+1234567890',
      password: process.env.ADMIN_PASSWORD , // In production, use a strong password
      role: 'admin'
    });

    console.log('Admin user created successfully:');
    console.log(`Email: ${adminUser.email}`);
    console.log('Please change the default password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();