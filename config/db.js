const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {});
        console.log(`MongoDB Success: ${connection.connection.host}`);
    } catch (e) {
        console.error(`MongoDB Error: ${e.message}`);
        process.exit(1);
    }
}

module.exports = connectDB