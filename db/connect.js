const mongoose = require("mongoose");


const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true
        });
        console.log('DEBUG: MongoDB connected');
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
