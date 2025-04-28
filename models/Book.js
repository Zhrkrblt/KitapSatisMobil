const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  page: Number,
  category: { type: String, default: 'Roman' }
}, { collection: 'kitaplar' });

module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema); 