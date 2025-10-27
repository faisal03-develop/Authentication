const mongoose = require('mongoose');

const connectDB = async () => {
  // allow a fallback to a local MongoDB for quick dev runs
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/zapta_auth';
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to', uri);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // don't exit so the server can still start for frontend integration in dev
  }
};

module.exports = connectDB;
