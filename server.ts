import express from 'express';
import cors from 'cors';
import { connectDB } from './app/config/db';
import { getBooks } from './routes/books';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Örnek kitap verileri - veritabanı bağlantısı olmadığında kullanılacak
const sampleBooks = [
  {
    _id: '1',
    title: 'Harry Potter ve Felsefe Taşı',
    author: 'J.K. Rowling',
    price: 45.99,
    coverImage: 'https://m.media-amazon.com/images/I/91ocU8970hL._AC_UF1000,1000_QL80_.jpg',
    description: 'Harry Potter serisinin ilk kitabı',
    category: 'Fantastik',
    stock: 15
  },
  {
    _id: '2',
    title: 'Yüzüklerin Efendisi',
    author: 'J.R.R. Tolkien',
    price: 65.50,
    coverImage: 'https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg',
    description: 'Klasik fantezi serisinin ilk kitabı',
    category: 'Fantastik',
    stock: 8
  },
  {
    _id: '3',
    title: 'Suç ve Ceza',
    author: 'Fyodor Dostoyevski',
    price: 35.75,
    coverImage: 'https://m.media-amazon.com/images/I/71OZJsgZzQL._AC_UF1000,1000_QL80_.jpg',
    description: 'Klasik Rus edebiyatının başyapıtı',
    category: 'Klasik',
    stock: 12
  },
];

// Sunucu başlatılırken veritabanına bağlan
connectDB()
  .then(() => {
    // Bağlantı başarılıysa gerçek route
    app.get('/api/books', getBooks);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    // Bağlantı başarısızsa örnek veri döndüren route
    console.error('MongoDB bağlantı hatası:', error);
    app.get('/api/books', (req, res) => {
      res.json({
        success: true,
        data: sampleBooks
      });
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (veritabanı bağlantısı yok)`);
    });
  }); 