const app = require('./src/app');
const connectDB = require('./src/config/db');
const User = require('./src/models/user.model');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Ensure an admin user exists
const ensureAdminUser = async () => {
  try {
    // Check if any admin user exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (!existingAdmin) {
      // Create default admin user with credentials from environment variables
      const adminUser = await User.create({
        fullName: 'Admin User',
        email: process.env.ADMIN_EMAIL || 'admin@softsolution.com',
        phone: '+1234567890',
        password: process.env.ADMIN_PASSWORD || 'admin123', // In production, use a strong password
        role: 'admin'
      });

      console.log('Default admin user created successfully:');
      console.log(`Email: ${adminUser.email}`);
      console.log('Please change the default password after first login!');
    }
  } catch (error) {
    console.error('Error ensuring admin user:', error);
  }
};

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Ensure admin user exists after connecting to DB
setTimeout(ensureAdminUser, 2000);