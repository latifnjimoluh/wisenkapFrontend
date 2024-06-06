import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { getBudgets, createSaving } from '../api';
import { Picker } from '@react-native-picker/picker';

const Savings = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
 
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const budgetResponse = await getBudgets();
        setBudgets(budgetResponse);
        if (budgetResponse.length > 0) {
          setSelectedBudget(budgetResponse[0].id);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des budgets:', error);
        Alert.alert('Erreur', 'Erreur lors de la récupération des budgets.');
      }
    };

    fetchBudgets();
  }, []);

  const handleSave = async () => {
    if (!selectedBudget || !amount) {
      Alert.alert('Erreur', 'Veuillez sélectionner un budget et entrer un montant.');
      return;
    }
    try {
      await createSaving({ budgetId: selectedBudget, amount, date });
      Alert.alert('Succès', 'Épargne ajoutée avec succès.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'épargne:', error);
      Alert.alert('Erreur', 'Erreur lors de l\'ajout de l\'épargne.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Épargne</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sélectionner le budget</Text>
        <Picker
          selectedValue={selectedBudget}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedBudget(itemValue)}
        >
          {budgets.map(budget => (
            <Picker.Item key={budget.id} label={budget.category} value={budget.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Montant à épargner</Text>
        <TextInput
          style={styles.input}
          placeholder="Montant"
          placeholderTextColor="#8E8E93"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="JJ/MM/AAAA"
          placeholderTextColor="#8E8E93"
          value={date.toLocaleDateString()}
          editable={false}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Épargner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate('SavingsHistory')}>
        <Text style={styles.historyButtonText}>Voir l'historique des épargnes</Text>
      </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
    color: 'black',
  },
  picker: {
    height: 40,
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
    color: 'black',
  },
  saveButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: '#005D8C',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  historyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Savings;
