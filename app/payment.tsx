import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

export default function PaymentScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    // Ödeme işlemleri burada yapılacak
    router.replace('/home' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ödeme</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Kredi Kartı Bilgileri</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Kart Numarası</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Kart Üzerindeki İsim</Text>
            <TextInput
              style={styles.input}
              placeholder="Ad Soyad"
              value={cardName}
              onChangeText={setCardName}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Son Kullanma Tarihi</Text>
              <TextInput
                style={styles.input}
                placeholder="AA/YY"
                value={expiryDate}
                onChangeText={setExpiryDate}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Sipariş Özeti</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ara Toplam</Text>
            <Text style={styles.summaryValue}>229.97 TL</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Kargo</Text>
            <Text style={styles.summaryValue}>Ücretsiz</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Toplam</Text>
            <Text style={styles.totalValue}>229.97 TL</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Ödemeyi Tamamla</Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#007AFF',
  },
  backButton: {
    marginRight: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  payButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    margin: 15,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 