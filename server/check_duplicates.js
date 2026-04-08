const mongoose = require('mongoose');
const Certificate = require('./models/Certificate');
const dotenv = require('dotenv');

dotenv.config();

const checkDuplicates = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const duplicates = await Certificate.aggregate([
            {
                $group: {
                    _id: "$certId",
                    count: { $sum: 1 },
                    docs: { $push: "$_id" }
                }
            },
            {
                $match: {
                    count: { $gt: 1 }
                }
            }
        ]);

        if (duplicates.length === 0) {
            console.log('No duplicates found.');
        } else {
            console.log('Duplicates found:');
            duplicates.forEach(d => {
                console.log(`certId: ${d._id}, count: ${d.count}`);
            });
        }

        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDuplicates();
