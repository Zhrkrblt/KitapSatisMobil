export interface Book {
  _id: string;
  baslik: string;
  yazar: string;
  aciklama: string;
  fiyat: number;
  resimUrl: string;
  kategori: string;
  sayfaSayisi: number;
  yayinTarihi?: Date;
  stokDurumu: boolean;
  quantity?: number; // Sepet işlemleri için
} 