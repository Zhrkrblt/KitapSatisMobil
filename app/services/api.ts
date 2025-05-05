import { Book } from '../types';
import Constants from 'expo-constants';

// Mobil cihazlardan localhost'a erişilemediği için IP adresi ile değiştiriyoruz
// Expo'da çalışırken, development server IP'sini kullanabilirsiniz
// Constants.manifest?.debuggerHost?.split(':')[0] formatı ile IP adresini alıyoruz

// Alternatif olarak sabit IP de kullanabilirsiniz
// const API_URL = 'http://192.168.1.X:3000/api'; // Kendi IP adresinizi yazın
const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000/api';

export const fetchAllBooks = async (): Promise<Book[]> => {
  try {
    console.log('API URL:', API_URL);
    const response = await fetch(`${API_URL}/kitaplar`);
    if (!response.ok) {
      throw new Error('Kitaplar yüklenirken bir hata oluştu');
    }
    return await response.json();
  } catch (error) {
    console.error('Kitapları getirme hatası:', error);
    return [];
  }
};

export const fetchBooksByCategory = async (kategori: string): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_URL}/kitaplar/kategori/${kategori}`);
    if (!response.ok) {
      throw new Error(`${kategori} kategorisindeki kitaplar yüklenirken bir hata oluştu`);
    }
    return await response.json();
  } catch (error) {
    console.error('Kategori kitaplarını getirme hatası:', error);
    return [];
  }
};

export const fetchBookById = async (id: string): Promise<Book | null> => {
  try {
    const response = await fetch(`${API_URL}/kitaplar/${id}`);
    if (!response.ok) {
      throw new Error('Kitap detayı yüklenirken bir hata oluştu');
    }
    return await response.json();
  } catch (error) {
    console.error('Kitap detayı getirme hatası:', error);
    return null;
  }
}; 