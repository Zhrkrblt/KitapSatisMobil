const mongoose = require('mongoose');

const kitapSchema = new mongoose.Schema({
  baslik: {
    type: String,
    required: true
  },
  yazar: {
    type: String,
    required: true
  },
  aciklama: {
    type: String,
    required: true
  },
  fiyat: {
    type: Number,
    required: true
  },
  resimUrl: {
    type: String,
    required: true
  },
  kategori: {
    type: String,
    required: true,
    enum: ['Roman', 'Bilim Kurgu', 'Tarih', 'Felsefe', 'Kişisel Gelişim', 'Biyografi']
  },
  sayfaSayisi: {
    type: Number,
    required: true
  },
  yayinTarihi: {
    type: Date,
    default: Date.now
  },
  stokDurumu: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Kitap = mongoose.model('Kitap', kitapSchema);

module.exports = Kitap; 