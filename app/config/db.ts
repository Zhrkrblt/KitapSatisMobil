import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://zehra:zehra23@zehra.rjgiqze.mongodb.net/kitap_veritabani';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    throw error;
  }
}; 