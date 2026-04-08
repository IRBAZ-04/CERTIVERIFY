const mongoose = require('mongoose');
const Certificate = require('../models/Certificate');
const dotenv = require('dotenv');

dotenv.config();

const cleanupDuplicates = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const duplicates = await Certificate.aggregate([
            {
                $group: {
                    _id: "$certId",
                    uniqueIds: { $push: "$_id" },
                    count: { $sum: 1 }
                }
            },
            {
                $match: {
                    count: { $gt: 1 }
                }
            }
        ]);

        console.log(`Found ${duplicates.length} certificate IDs with duplicates.`);

        for (const duplicate of duplicates) {
            // Keep the last one, delete the rest
            const idsToDelete = duplicate.uniqueIds.slice(0, duplicate.uniqueIds.length - 1);
            console.log(`Cleaning up ${duplicate._id}: keeping 1, deleting ${idsToDelete.length}`);
            await Certificate.deleteMany({ _id: { $in: idsToDelete } });
        }

        console.log('Cleanup completed.');
        await mongoose.connection.close();
    } catch (err) {
        console.error('Error during cleanup:', err);
        process.exit(1);
    }
};

cleanupDuplicates();
