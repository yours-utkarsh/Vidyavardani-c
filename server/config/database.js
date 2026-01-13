const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return Promise.resolve();
  }
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return Promise.resolve();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return Promise.reject(error);
  }
};