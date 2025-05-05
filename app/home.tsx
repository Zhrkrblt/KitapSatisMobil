import React, { useState, useEffect } from 'react';
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
import { Book } from './types';
import { fetchAllBooks, fetchBooksByCategory } from './services/api';

const CATEGORIES = [
  'Roman',
  'Bilim Kurgu',
  'Tarih',
  'Felsefe',
  'Kişisel Gelişim',
  'Biyografi'
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Tüm kitapları yükle
  useEffect(() => {
    loadBooks();
  }, []);

  // Arama işlemi
  useEffect(() => {
    if (books.length > 0) {
      const filtered = books.filter(book => 
        book.baslik.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.yazar.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, books]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const allBooks = await fetchAllBooks();
      setBooks(allBooks);
      setFilteredBooks(allBooks);
    } catch (error) {
      console.error('Kitapları yükleme hatası:', error);
      Alert.alert('Hata', 'Kitaplar yüklenirken bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (category: string) => {
    setLoading(true);
    try {
      if (selectedCategory === category) {
        // Aynı kategori tekrar seçilirse filtre kaldırılır
        setSelectedCategory(null);
        setFilteredBooks(books);
      } else {
        // Yeni kategori seçilirse filtreleme yapılır
        setSelectedCategory(category);
        const categoryBooks = await fetchBooksByCategory(category);
        setFilteredBooks(categoryBooks);
      }
    } catch (error) {
      console.error('Kategori kitaplarını yükleme hatası:', error);
      Alert.alert('Hata', 'Kitaplar yüklenirken bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity 
      style={styles.bookCard}
      onPress={() => router.push(`/details/${item._id}` as any)}
    >
      <Image 
        source={{ uri: item.resimUrl || 'https://via.placeholder.com/150x200?text=Kitap' }} 
        style={styles.bookImage}
        onError={(e) => console.log('Resim yükleme hatası', e.nativeEvent.error)}
      />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={1} ellipsizeMode="tail">{item.baslik}</Text>
        <Text style={styles.bookAuthor} numberOfLines={1} ellipsizeMode="tail">{item.yazar}</Text>
        <Text style={styles.bookPrice}>{item.fiyat.toFixed(2)} TL</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kitap Dünyası</Text>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => router.push('/cart' as any)}
        >
          <Text style={styles.cartButtonText}>Sepetim</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Kitap ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity 
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.selectedCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={filteredBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.bookList}
          columnWrapperStyle={styles.bookRow}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Kitap bulunamadı.</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 20,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    color: '#333',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookList: {
    padding: 8,
  },
  bookRow: {
    justifyContent: 'space-between',
  },
  bookCard: {
    width: '48%',
    aspectRatio: 1,
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookImage: {
    width: '100%',
    height: '65%',
    resizeMode: 'contain',
    backgroundColor: '#f5f5f5',
  },
  bookInfo: {
    padding: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },
  bookAuthor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  bookPrice: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
}); 