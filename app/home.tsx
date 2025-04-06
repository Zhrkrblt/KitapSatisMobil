import React, { useState } from 'react';
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
} from 'react-native';
import { router } from 'expo-router';
import { Book } from './types';

const DUMMY_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Suç ve Ceza',
    author: 'Fyodor Dostoyevski',
    price: '89.99',
    image: null,
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    price: '69.99',
    image: null,
  },
  {
    id: '3',
    title: 'Küçük Prens',
    author: 'Antoine de Saint-Exupéry',
    price: '49.99',
    image: null,
  },
  {
    id: '4',
    title: 'Simyacı',
    author: 'Paulo Coelho',
    price: '59.99',
    image: null,
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity style={styles.bookCard}>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookPrice}>{item.price} TL</Text>
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
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>Roman</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>Bilim Kurgu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>Tarih</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>Felsefe</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={DUMMY_BOOKS}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.bookList}
        showsVerticalScrollIndicator={false}
      />
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
  categoryButtonText: {
    color: '#333',
    fontSize: 14,
  },
  bookList: {
    padding: 10,
  },
  bookCard: {
    flex: 1,
    margin: 5,
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
  bookInfo: {
    padding: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
}); 