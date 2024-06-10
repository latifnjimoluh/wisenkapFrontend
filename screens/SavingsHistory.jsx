import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { getSavingsHistory } from '../api';
import Footer from '../components/Footer';

const SavingsHistory = ({ navigation }) => {
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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Historique des épargnes</Text>
      {savingsHistory.map((saving, index) => (
        <View key={index} style={styles.savingContainer}>
          <Text style={styles.text}><Text style={styles.label}>Budget: </Text>{saving.budgetCategory}</Text>
          <Text style={styles.text}><Text style={styles.label}>Montant: </Text>{saving.amount} FCFA</Text>
          <Text style={styles.text}><Text style={styles.label}>Date: </Text>{new Date(saving.date).toLocaleDateString()}</Text>
        </View>
      ))}
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <Footer/>
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

export default SavingsHistory;
