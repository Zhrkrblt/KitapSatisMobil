import { Request, Response } from 'express';
import { Book } from '../models/Book';

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      data: books
    });
  } catch (error) {
    console.error('Kitaplar getirilirken hata oluştu:', error);
    res.status(500).json({
      success: false,
      message: 'Kitaplar getirilirken bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
}; 