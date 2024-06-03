import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const CurrencySettings = () => {
  const [currencies, setCurrencies] = useState([
    { name: 'USD - United States Dollar', selected: false },
    { name: 'EUR - Euro', selected: false },
    { name: 'JPY - Japanese Yen', selected: false },
    { name: 'GBP - British Pound', selected: false },
    { name: 'AUD - Australian Dollar', selected: false },
    { name: 'CAD - Canadian Dollar', selected: false },
    { name: 'CHF - Swiss Franc', selected: false },
    { name: 'CNY - Chinese Yuan', selected: false },
    { name: 'SEK - Swedish Krona', selected: false },
    { name: 'NZD - New Zealand Dollar', selected: false },
    // Monnaies d'Afrique
    { name: 'XOF - West African CFA franc', selected: false },
    { name: 'XAF - Central African CFA franc', selected: false },
    { name: 'NGN - Nigerian Naira', selected: false },
    { name: 'EGP - Egyptian Pound', selected: false },
    { name: 'ZAR - South African Rand', selected: false },
    { name: 'KES - Kenyan Shilling', selected: false },
    { name: 'GHS - Ghanaian Cedi', selected: false },
    { name: 'TZS - Tanzanian Shilling', selected: false },
    { name: 'UGX - Ugandan Shilling', selected: false },
    { name: 'DZD - Algerian Dinar', selected: false },
    { name: 'MAD - Moroccan Dirham', selected: false },
    { name: 'BWP - Botswanan Pula', selected: false },
    { name: 'ZMW - Zambian Kwacha', selected: false },
  ]);

  const handleSelectCurrency = (index) => {
    const updatedCurrencies = currencies.map((currency, idx) => ({
      ...currency,
      selected: idx === index,
    }));

    const selectedCurrency = updatedCurrencies.filter(currency => currency.selected);
    const unselectedCurrencies = updatedCurrencies.filter(currency => !currency.selected);
    setCurrencies([...selectedCurrency, ...unselectedCurrencies]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Devises et Formats de Montant</Text>
      <View style={styles.currencyList}>
        {currencies.map((currency, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.currencyItem, currency.selected && styles.selectedCurrency]}
            onPress={() => handleSelectCurrency(index)}
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
});

export default CurrencySettings;
