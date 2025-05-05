const mongoose = require('mongoose');
const connectDB = require('../db/connection');
const Kitap = require('../models/kitap');
const { MONGODB_URI } = require('../config');

const kitaplar = [
  {
    baslik: "Suç ve Ceza",
    yazar: "Fyodor Dostoyevski",
    aciklama: "Eski hukuk öğrencisi Rodion Raskolnikov'un psikolojik durumunu anlatan klasik roman.",
    fiyat: 75.50,
    resimUrl: "https://via.placeholder.com/300x450?text=Suç+ve+Ceza",
    kategori: "Roman",
    sayfaSayisi: 671,
    stokDurumu: true
  },
  {
    baslik: "Dune",
    yazar: "Frank Herbert",
    aciklama: "Çöl gezegeni Arrakis'te geçen bir bilim kurgu destanı.",
    fiyat: 95.90,
    resimUrl: "https://via.placeholder.com/300x450?text=Dune",
    kategori: "Bilim Kurgu",
    sayfaSayisi: 896,
    stokDurumu: true
  },
  {
    baslik: "Sapiens",
    yazar: "Yuval Noah Harari",
    aciklama: "İnsanlık tarihinin kısa bir özeti.",
    fiyat: 120.00,
    resimUrl: "https://via.placeholder.com/300x450?text=Sapiens",
    kategori: "Tarih",
    sayfaSayisi: 464,
    stokDurumu: true
  },
  {
    baslik: "Sokrates'in Savunması",
    yazar: "Platon",
    aciklama: "Sokrates'in yargılanmasını anlatan felsefi eser.",
    fiyat: 45.75,
    resimUrl: "https://via.placeholder.com/300x450?text=Sokrates",
    kategori: "Felsefe",
    sayfaSayisi: 156,
    stokDurumu: true
  },
  {
    baslik: "Atomic Habits",
    yazar: "James Clear",
    aciklama: "Küçük değişikliklerle büyük sonuçlar elde etmenin yolu.",
    fiyat: 85.50,
    resimUrl: "https://via.placeholder.com/300x450?text=Atomic+Habits",
    kategori: "Kişisel Gelişim",
    sayfaSayisi: 320,
    stokDurumu: true
  },
  {
    baslik: "Steve Jobs",
    yazar: "Walter Isaacson",
    aciklama: "Apple'ın kurucusu Steve Jobs'un hayatını anlatan biyografi.",
    fiyat: 110.25,
    resimUrl: "https://via.placeholder.com/300x450?text=Steve+Jobs",
    kategori: "Biyografi",
    sayfaSayisi: 656,
    stokDurumu: true
  },
  {
    baslik: "1984",
    yazar: "George Orwell",
    aciklama: "Distopik bir dünyada geçen, gözetim toplumunu eleştiren roman.",
    fiyat: 65.90,
    resimUrl: "https://via.placeholder.com/300x450?text=1984",
    kategori: "Roman",
    sayfaSayisi: 328,
    stokDurumu: true
  },
  {
    baslik: "Neuromancer",
    yazar: "William Gibson",
    aciklama: "Siber punk edebiyatının öncü eserlerinden biri.",
    fiyat: 79.50,
    resimUrl: "https://via.placeholder.com/300x450?text=Neuromancer",
    kategori: "Bilim Kurgu",
    sayfaSayisi: 271,
    stokDurumu: true
  },
  {
    baslik: "Cesur Yeni Dünya",
    yazar: "Aldous Huxley",
    aciklama: "Teknolojinin ve bilimin kontrolsüz ilerleyişini eleştiren distopik roman.",
    fiyat: 68.75,
    resimUrl: "https://via.placeholder.com/300x450?text=Cesur+Yeni+Dünya",
    kategori: "Bilim Kurgu",
    sayfaSayisi: 288,
    stokDurumu: true
  },
  {
    baslik: "İçimizdeki Şeytan",
    yazar: "Sabahattin Ali",
    aciklama: "İçsel çatışmaları ve toplumsal baskıları işleyen bir roman.",
    fiyat: 55.00,
    resimUrl: "https://via.placeholder.com/300x450?text=İçimizdeki+Şeytan",
    kategori: "Roman",
    sayfaSayisi: 256,
    stokDurumu: true
  }
];

const ekleKitaplar = async () => {
  try {
    await connectDB();
    
    // Önce mevcut kitapları sil
    await Kitap.deleteMany({});
    console.log('Tüm kitaplar silindi');
    
    // Yeni kitapları ekle
    const eklenenKitaplar = await Kitap.insertMany(kitaplar);
    console.log(`${eklenenKitaplar.length} adet kitap başarıyla eklendi`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Hata:', error.message);
    process.exit(1);
  }
};

ekleKitaplar(); 