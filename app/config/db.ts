import mongoose from 'mongoose';

// Kullanıcının paylaştığı MongoDB Atlas URI
const MONGODB_URI = 'mongodb+srv://zehra:zehra23@zehra.rjgiqze.mongodb.net/kitap_veritabani?retryWrites=true&w=majority&appName=zehra';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // Sunucu seçimi için zaman aşımını 10 saniye olarak ayarla
      socketTimeoutMS: 45000, // Soket zaman aşımını 45 saniye olarak ayarla
    });
    console.log('MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    console.log('MongoDB hatası nedeniyle örnek verilerle devam edilecek.');
    // Uygulamanın çökmesini engelle, sadece hata logla
    return;
  }
}; 