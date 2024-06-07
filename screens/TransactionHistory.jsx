import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { getTransactionHistory } from '../api';

const TransactionHistory = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await getTransactionHistory();
        setTransactions(response);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des transactions:', error);
        Alert.alert('Erreur', 'Erreur lors de la récupération de l\'historique des transactions.');
      }
    };

    fetchTransactionHistory();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Historique des Transactions</Text>
      {transactions.map((transaction, index) => (
        <View key={index} style={styles.transactionContainer}>
          <Text style={styles.transactionText}>
            <Text style={styles.label}>Catégorie: </Text>{transaction.category}
          </Text>
          <Text style={styles.transactionText}>
            <Text style={styles.label}>Montant: </Text>{transaction.amount} FCFA
          </Text>
          <Text style={styles.transactionText}>
            <Text style={styles.label}>Date: </Text>{new Date(transaction.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.transactionText}>
            <Text style={styles.label}>Budget: </Text>{transaction.budgetCategory}
          </Text>
        </View>
      ))}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40, // Assure que le bouton n'est pas collé au bas de l'écran
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A8E8',
    marginBottom: 20,
    textAlign: 'center',
  },
  transactionContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  transactionText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  label: {
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#005D8C',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
    width: '50%', // Assure que le bouton est centré et de taille appropriée
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionHistory;
