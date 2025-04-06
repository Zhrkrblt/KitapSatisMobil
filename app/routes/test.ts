import { Request, Response } from 'express';
import { connectDB } from '../config/db';

export const testConnection = async (req: Request, res: Response) => {
  try {
    await connectDB();
    res.status(200).json({
      success: true,
      message: 'Veritabanı bağlantısı başarılı!',
    });
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Veritabanı bağlantısı başarısız!',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata',
    });
  }
}; 