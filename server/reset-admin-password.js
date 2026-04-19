const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const User = require('./models/User');

async function resetAdminPassword() {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
        
        const adminEmail = 'admin@certiverify.com';
        const newPassword = 'Admin123!';
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        const admin = await User.findOneAndUpdate(
            { email: adminEmail },
            { 
                name: 'Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin'
            },
            { upsert: true, new: true }
        );
        
        console.log('Admin account reset successfully!');
        console.log('Email:', adminEmail);
        console.log('Password:', newPassword);
        console.log('Role: admin');
        
        const verify = await User.findOne({ email: adminEmail });
        const valid = await bcrypt.compare(newPassword, verify.password);
        console.log('Password verification:', valid ? 'SUCCESS' : 'FAILED');
        
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

resetAdminPassword();
