import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { getBooks } from './routes/books';

const app = express();

// MongoDB bağlantısı
mongoose.connect('mongodb+srv://zehra:zehra23@zehra.rjgiqze.mongodb.net/kitap_veritabani?retryWrites=true&w=majority&appName=zehra')
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/books', getBooks);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
}); 