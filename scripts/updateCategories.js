const mongoose = require('mongoose');
const Book = require('../models/Book');

const MONGODB_URI = 'mongodb+srv://zehra:zehra23@zehra.rjgiqze.mongodb.net/kitap_veritabani?retryWrites=true&w=majority&appName=zehra';

const updateCategories = async () => {
  try {
    console.log('MongoDB Atlas bağlantısı kuruluyor...');
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Atlas bağlantısı başarılı');

    console.log('Kitaplar getiriliyor...');
    const books = await Book.find();
    console.log(`${books.length} kitap bulundu`);

    if (books.length === 0) {
      console.log('Veritabanında kitap bulunamadı!');
      process.exit(0);
    }

    for (const book of books) {
      try {
        const title = book.title.toLowerCase();
        const author = book.author.toLowerCase();

        // Kategori belirleme
        if (title.includes('harry potter') || author.includes('rowling')) {
          book.category = 'Fantastik';
        } else if (title.includes('1984') || author.includes('orwell')) {
          book.category = 'Bilim Kurgu';
        } else if (title.includes('suç ve ceza') || author.includes('dostoyevski')) {
          book.category = 'Klasik';
        } else if (title.includes('savaş') || title.includes('barış') || author.includes('tolstoy')) {
          book.category = 'Klasik';
        } else if (title.includes('küçük') || title.includes('prens') || author.includes('saint-exupéry')) {
          book.category = 'Çocuk';
        } else if (title.includes('dönüşüm') || author.includes('kafka')) {
          book.category = 'Klasik';
        } else if (title.includes('yüzüklerin') || author.includes('tolkien')) {
          book.category = 'Fantastik';
        } else if (title.includes('marslı') || title.includes('uzay')) {
          book.category = 'Bilim Kurgu';
        } else if (title.includes('otostopçunun') || author.includes('adams')) {
          book.category = 'Bilim Kurgu';
        } else {
          book.category = 'Roman'; // Varsayılan kategori
        }

        await book.save();
        console.log(`${book.title} kitabı ${book.category} kategorisine eklendi.`);
      } catch (saveError) {
        console.error(`${book.title} kitabı güncellenirken hata oluştu:`, saveError);
      }
    }
    console.log('Tüm kitaplar kategorilere ayrıldı!');
    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
};

updateCategories(); 