const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const User = require('./models/User');

async function resetAdminPassword() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        const newPassword = 'AmdoxAdmin123!'; // CHANGE THIS TO YOUR DESIRED PASSWORD
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        const admin = await User.findOneAndUpdate(
            { role: 'admin' },
            { password: hashedPassword },
            { new: true }
        );
        
        if (admin) {
            console.log(`Admin password updated successfully!`);
            console.log(`Email: ${admin.email}`);
            console.log(`New Password: ${newPassword}`);
        } else {
            console.log('No admin user found');
        }
        
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Error:', err.message);
    }
}

resetAdminPassword();
