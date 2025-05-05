# Kitap Satış Uygulaması - Kullanım Kılavuzu

## Kurulum

### Bağımlılıkları Yükleme
```bash
npm install
```

## MongoDB Veritabanı ve API Sunucusu

1. **Veritabanına Kitapları Ekleme**:
   ```bash
   npm run kitap-ekle
   ```
   Bu komut, MongoDB Atlas'taki veritabanınıza örnek kitapları ekleyecektir.

2. **API Sunucusunu Başlatma**:
   ```bash
   npm run api
   ```
   API sunucusu http://localhost:3000 adresinde çalışacaktır.

## Mobil Uygulamayı Çalıştırma

1. **Uygulamayı Başlatma**:
   ```bash
   npm start
   ```

2. **Farklı Platformlarda Çalıştırma**:
   - Android: `npm run android`
   - iOS: `npm run ios`
   - Web: `npm run web`

## Uygulama Özellikleri

### Anasayfa
- Tüm kitapların listelendiği sayfa
- Kategoriye göre filtreleme yapabilme
- Kitap arama özelliği

### Kitap Detay Sayfası
- Kitap hakkında detaylı bilgiler
- Sepete ekleme özelliği

### Sepet Sayfası
- Sepete eklenen kitapların listesi
- Ürün adet güncelleme ve kaldırma
- Toplam tutar hesaplama

### Ödeme Sayfası
- Ödeme bilgilerinin girilebildiği form
- Sipariş tamamlama

## API Kullanımı

### Endpoint'ler

1. **Tüm Kitapları Getir**:
   ```
   GET http://localhost:3000/api/kitaplar
   ```

2. **Kategori Bazında Kitapları Getir**:
   ```
   GET http://localhost:3000/api/kitaplar/kategori/Roman
   GET http://localhost:3000/api/kitaplar/kategori/Bilim Kurgu
   GET http://localhost:3000/api/kitaplar/kategori/Tarih
   ...
   ```

3. **Kitap Detayını Getir**:
   ```
   GET http://localhost:3000/api/kitaplar/:id
   ```

4. **Yeni Kitap Ekle**:
   ```
   POST http://localhost:3000/api/kitaplar
   
   Body:
   {
     "baslik": "Yeni Kitap",
     "yazar": "Yazar Adı",
     "aciklama": "Kitap açıklaması",
     "fiyat": 50.00,
     "resimUrl": "https://example.com/kitap.jpg",
     "kategori": "Roman",
     "sayfaSayisi": 250,
     "stokDurumu": true
   }
   ```

5. **Kitap Güncelle**:
   ```
   PUT http://localhost:3000/api/kitaplar/:id
   
   Body:
   {
     "fiyat": 55.00,
     "stokDurumu": false
   }
   ```

6. **Kitap Sil**:
   ```
   DELETE http://localhost:3000/api/kitaplar/:id
   ```

## Sorun Giderme

1. **API Bağlantı Hataları**:
   - API sunucusunun çalıştığından emin olun
   - MongoDB bağlantı bilgilerinin doğru olduğunu kontrol edin

2. **Mobil Uygulama Sorunları**:
   - API URL'sinin doğru olduğunu kontrol edin
   - Expo sunucusunu yeniden başlatmayı deneyin

3. **MongoDB Bağlantı Hataları**:
   - MongoDB Atlas hesabınıza erişim sağlayın
   - IP adresinizin erişim listesinde olduğundan emin olun
   - Veritabanı kullanıcı adı ve şifresinin doğru olduğunu kontrol edin 