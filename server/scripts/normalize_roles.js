const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const User = require('../models/User');

const normalizeRoles = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/certify');
        console.log('Connected.');

        const users = await User.find({});
        console.log(`Analyzing ${users.length} users...`);

        let updatedCount = 0;
        for (const user of users) {
            const oldRole = user.role;
            const newRole = user.role.toUpperCase();

            if (oldRole !== newRole) {
                user.role = newRole;
                await user.save();
                console.log(`Updated ${user.email}: ${oldRole} -> ${newRole}`);
                updatedCount++;
            }
        }

        console.log(`Normalization complete. ${updatedCount} users updated.`);
        process.exit(0);
    } catch (err) {
        console.error('Error during normalization:', err);
        process.exit(1);
    }
};

normalizeRoles();
