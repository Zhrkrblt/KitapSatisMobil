import { Request, Response } from 'express';
const Book = require('../models/Book');

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json({ success: true, data: books });
  } catch (error) {
    console.error('Kitaplar getirilirken hata:', error);
    res.status(500).json({ success: false, message: 'Kitaplar getirilirken bir hata oluştu' });
  }
}; 