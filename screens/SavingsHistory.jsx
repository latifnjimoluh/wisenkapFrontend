import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { getSavingsHistory } from '../api';

const SavingsHistory = () => {
  const [savingsHistory, setSavingsHistory] = useState([]);

  useEffect(() => {
    const fetchSavingsHistory = async () => {
      try {
        const response = await getSavingsHistory();
        setSavingsHistory(response);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des épargnes:', error);
        Alert.alert('Erreur', 'Erreur lors de la récupération de l\'historique des épargnes.');
      }
    };

    fetchSavingsHistory();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Historique des épargnes</Text>
      {savingsHistory.map((saving, index) => (
        <View key={index} style={styles.savingContainer}>
          <Text style={styles.text}>Budget: {saving.budgetCategory}</Text>
          <Text style={styles.text}>Montant: {saving.amount} FCFA</Text>
          <Text style={styles.text}>Date: {new Date(saving.date).toLocaleDateString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A8E8',
    marginBottom: 20,
    textAlign: 'center',
  },
  savingContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
  },
  text: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 5,
  },
});

export default SavingsHistory;
