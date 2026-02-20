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

    // Create default admin user
    const adminUser = await User.create({
      fullName: 'Admin User',
      email: 'admin@softsolution.com',
      phone: '+1234567890',
      password: 'admin123', // In production, use a strong password
      role: 'admin'
    });

    console.log('Admin user created successfully:');
    console.log(`Email: ${adminUser.email}`);
    console.log(`Password: admin123`);
    console.log('Please change the default password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();