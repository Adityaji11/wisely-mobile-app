const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const dbUri = process.env.MongoDB;
    await mongoose.connect(dbUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

module.exports = { connectToDatabase };
