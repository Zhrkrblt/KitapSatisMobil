import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
// İkonlar için (opsiyonel, eğer yüklü değilse npm install @expo/vector-icons)
import { Ionicons } from '@expo/vector-icons';

// Genişletilmiş Kitap Arayüzü
interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  image?: string;
  publisher?: string;
  rating?: number;
  category?: string; // Kategori filtresi için
  // Diğer alanlar eklenebilir
}

const API_URL = 'http://localhost:3000/api/books';

// Örnek Kategoriler (Backend'den gelmiyorsa)
const CATEGORIES = ['Roman', 'Bilim Kurgu', 'Tarih', 'Felsefe', 'Çocuk'];

export default function HomeScreen() {
  const [allBooks, setAllBooks] = useState<Book[]>([]); // Tüm kitaplar
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Seçili kategori

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<{ success: boolean; data: Book[] }>(API_URL);
        if (response.data.success) {
          setAllBooks(response.data.data);
        } else {
          throw new Error('Kitaplar alınamadı');
        }
      } catch (err) {
        console.error("API Hatası:", err);
        setError('Kitaplar yüklenirken bir sorun oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filtrelenmiş kitapları hesaplamak için useMemo kullanalım
  const filteredBooks = useMemo(() => {
    let books = allBooks;

    // Kategoriye göre filtrele
    if (selectedCategory) {
      books = books.filter(book => book.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Arama sorgusuna göre filtrele (başlık veya yazar)
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      books = books.filter(book =>
        book.title.toLowerCase().includes(lowerCaseQuery) ||
        book.author.toLowerCase().includes(lowerCaseQuery)
      );
    }

    return books;
  }, [allBooks, searchQuery, selectedCategory]);

  // --- Yüklenme ve Hata Durumları --- (Değişiklik yok)
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Kitaplar yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  // --- Yüklenme ve Hata Durumları Bitiş ---

  // Geliştirilmiş Kitap Kartı Render Fonksiyonu
  const renderBook = ({ item }: { item: Book }) => (
    <TouchableOpacity style={styles.bookItem} onPress={() => console.log("Kitap Tıklandı:", item._id)}> {/* Detay sayfasına yönlendirme eklenebilir */}
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/80x120.png?text=Kitap' }} // Varsayılan resim
        style={styles.bookImage}
        resizeMode="cover"
      />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        {item.publisher && <Text style={styles.bookPublisher}>Yayınevi: {item.publisher}</Text>}
        <View style={styles.priceAndRatingContainer}>
          <Text style={styles.bookPrice}>{item.price.toFixed(2)} TL</Text>
          {item.rating && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>
      </View>
      {/* Sepete Ekle Butonu (Opsiyonel) */}
      {/* <TouchableOpacity style={styles.addToCartButton}>
        <Ionicons name="cart-outline" size={20} color="#007AFF" />
      </TouchableOpacity> */}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Başlık ve Sepet Butonu */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kitap Dünyası</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push('/cart' as any)}
        >
          <Ionicons name="cart-outline" size={24} color="#fff" />
          {/* Sepetteki ürün sayısı eklenebilir */}
        </TouchableOpacity>
      </View>

      {/* Arama Çubuğu */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Kitap veya yazar adı ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#888"
          clearButtonMode="while-editing" // iOS için temizle butonu
        />
      </View>

      {/* Kategori Filtreleri */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.categoryButton, !selectedCategory && styles.categoryButtonSelected]}
            onPress={() => setSelectedCategory(null)} // Tümünü göster
          >
            <Text style={[styles.categoryButtonText, !selectedCategory && styles.categoryButtonTextSelected]}>Tümü</Text>
          </TouchableOpacity>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonSelected]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.categoryButtonText, selectedCategory === category && styles.categoryButtonTextSelected]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Kitap Listesi */}
      {filteredBooks.length === 0 && !loading ? (
        <View style={styles.centered}>
          <Text style={styles.noResultText}>Aramanızla eşleşen kitap bulunamadı.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredBooks} // Filtrelenmiş veriyi kullan
          renderItem={renderBook}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          numColumns={1} // Tek sütunlu liste görünümü
        />
      )}
    </SafeAreaView>
  );
}

// --- Stil Tanımlamaları --- (Güncellendi)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Biraz daha açık arka plan
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 22, // Biraz küçültüldü
    fontWeight: 'bold',
    color: '#fff',
  },
  cartButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8, // Dikey padding ayarlandı
  },
  categoriesContainer: {
    paddingLeft: 15, // Soldan boşluk
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: '#e9ecef', // Seçili olmayan buton rengi
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  categoryButtonSelected: {
    backgroundColor: '#007AFF', // Seçili buton rengi
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    color: '#495057', // Seçili olmayan yazı rengi
    fontSize: 14,
    fontWeight: '500',
  },
  categoryButtonTextSelected: {
    color: '#fff', // Seçili yazı rengi
  },
  listContainer: {
    paddingHorizontal: 15, // Liste için yan boşluklar
    paddingBottom: 20,
  },
  bookItem: {
    backgroundColor: '#fff',
    padding: 12, // Biraz daha kompakt padding
    marginBottom: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  bookImage: {
    width: 70, // Biraz küçültüldü
    height: 105, // Oran korundu
    marginRight: 12,
    borderRadius: 6,
    backgroundColor: '#eee', // Resim yüklenene kadar yer tutucu
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 15, // Biraz küçültüldü
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#343a40',
  },
  bookAuthor: {
    fontSize: 13,
    color: '#6c757d', // Biraz daha soluk renk
    marginBottom: 6,
  },
  bookPublisher: {
    fontSize: 12,
    color: '#adb5bd',
    marginBottom: 6,
  },
  priceAndRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  bookPrice: {
    fontSize: 16, // Fiyat daha belirgin
    fontWeight: 'bold',
    color: '#007AFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd', // Puan arka planı
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
    color: '#856404', // Puan yazı rengi
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // İçerik için boşluk
  },
  errorText: {
    color: '#dc3545', // Hata rengi
    fontSize: 16,
    textAlign: 'center',
  },
  noResultText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
}); 