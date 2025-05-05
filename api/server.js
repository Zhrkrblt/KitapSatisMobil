const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');
const kitaplarRoutes = require('./routes/kitaplar');
const { PORT } = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Bağlantısı
connectDB();

// Routes
app.use('/api/kitaplar', kitaplarRoutes);

// Anasayfa
app.get('/', (req, res) => {
  res.send('Kitap Satış API çalışıyor!');
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
}); 