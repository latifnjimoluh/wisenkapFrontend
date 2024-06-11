import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, BackHandler, TextInput } from 'react-native';
import { getCurrencies, activateCurrency } from '../api';

const CurrencySettings = ({ navigation }) => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState(''); // État pour le texte de recherche

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data = await getCurrencies();
        setCurrencies(data.currencies); // Assurez-vous de traiter les données dans le bon format
      } catch (error) {
        console.error('Erreur lors du chargement des devises:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();

    const backAction = () => {
      navigation.navigate('Settings'); // Rediriger vers la page d'accueil
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  const handleSelectCurrency = async (currencyId) => {
    try {
      await activateCurrency(currencyId);
      const updatedCurrencies = currencies.map(currency => ({
        ...currency,
        is_active: currency.id === currencyId,
      }));

      const sortedCurrencies = updatedCurrencies.sort((a, b) => b.is_active - a.is_active);
      setCurrencies(sortedCurrencies);
    } catch (error) {
      console.error('Erreur lors de l\'activation de la devise:', error);
    }
  };

  // Filtrer les devises en fonction du texte de recherche
  const filteredCurrencies = currencies.filter(currency =>
    currency.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Gestion de la sélection d'une devise depuis les résultats de recherche
  const handleSearchSelect = async (currencyId) => {
    await handleSelectCurrency(currencyId);
    setSearchText(''); // Efface le texte de recherche
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00A8E8" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Erreur lors du chargement des devises</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Devises et Formats de Montant</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher une devise..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#9E9E9E" // Couleur de texte du placeholder
      />
      <View style={styles.currencyList}>
        {Array.isArray(filteredCurrencies) && filteredCurrencies.map(currency => (
          <TouchableOpacity 
            key={currency.id} 
            style={[styles.currencyItem, currency.is_active && styles.selectedCurrency]}
            onPress={() => handleSearchSelect(currency.id)}
          >
            <Text style={styles.currencyText}>{currency.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  searchInput: {
    fontSize: 16,
    padding: 10,
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    color: '#000', // Couleur du texte de la saisie
  },
  currencyList: {
    marginBottom: 20,
  },
  currencyItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  selectedCurrency: {
    backgroundColor: '#E0F7FA',
  },
  currencyText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CurrencySettings;
