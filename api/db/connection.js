const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB; 