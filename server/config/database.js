const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log('Database connection failed', err);
    });
}