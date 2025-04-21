import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
  },
  page: {
    type: Number,
  },
  language: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
  reviews: {
    type: Number,
  },
  cover: {
    type: String,
  },
  isbn: {
    type: String,
  },
  date: {
    type: String,
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Book = mongoose.model('Book', bookSchema); 