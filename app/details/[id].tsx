import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Book } from '../types';
import { fetchBookById } from '../services/api';
import { useCart } from '../context/CartContext';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    loadBookDetails();
  }, [id]);

  const loadBookDetails = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const bookData = await fetchBookById(id);
      setBook(bookData);
    } catch (error) {
      console.error('Kitap detayı yükleme hatası:', error);
      Alert.alert('Hata', 'Kitap detayları yüklenirken bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (book) {
      addToCart(book);
      Alert.alert('Başarılı', 'Kitap sepete eklendi!');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Kitap bulunamadı</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Geri</Text>
      </TouchableOpacity>
      
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: book.resimUrl || 'https://via.placeholder.com/300x400?text=Kitap' }} 
          style={styles.bookImage}
          onError={(e) => console.log('Resim yükleme hatası', e.nativeEvent.error)}
        />
      </View>
      
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{book.baslik}</Text>
        <Text style={styles.bookAuthor}>{book.yazar}</Text>
        
        <View style={styles.detailsRow}>
          <Text style={styles.bookCategory}>Kategori: {book.kategori}</Text>
          <Text style={styles.bookPages}>Sayfa: {book.sayfaSayisi}</Text>
        </View>
        
        <Text style={styles.bookPrice}>{book.fiyat.toFixed(2)} TL</Text>
        
        <Text style={styles.descriptionTitle}>Açıklama</Text>
        <Text style={styles.descriptionText}>{book.aciklama}</Text>
        
        <TouchableOpacity 
          style={[styles.addToCartButton, !book.stokDurumu && styles.disabledButton]}
          onPress={handleAddToCart}
          disabled={!book.stokDurumu}
        >
          <Text style={styles.addToCartButtonText}>
            {book.stokDurumu ? 'Sepete Ekle' : 'Stokta Yok'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#ff3b30',
    marginBottom: 20,
  },
  backButton: {
    padding: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  imageContainer: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  bookImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  bookInfo: {
    padding: 20,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  bookAuthor: {
    fontSize: 18,
    color: '#666',
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bookCategory: {
    fontSize: 14,
    color: '#666',
  },
  bookPages: {
    fontSize: 14,
    color: '#666',
  },
  bookPrice: {
    fontSize: 22,
    color: '#007AFF',
    fontWeight: 'bold',
    marginVertical: 12,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
}); 