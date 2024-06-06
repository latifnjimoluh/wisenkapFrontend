import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import { getBudgets, getExpensesByBudget, createTransactions } from '../api';
 
const SelectCategories = ({ navigation }) => {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [categories, setCategories] = useState([]);
  const [other, setOther] = useState({ amount: '', comment: '', selected: false });

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const budgetResponse = await getBudgets();
        setBudgets(budgetResponse);
      } catch (error) {
        console.error('Erreur lors de la récupération des budgets:', error);
        Alert.alert('Erreur', 'Erreur lors de la récupération des budgets.');
      }
    };

    fetchBudgets();
  }, []);

  const handleBudgetChange = async (budgetId) => {
    setSelectedBudget(budgetId);
    try {
      const expensesResponse = await getExpensesByBudget(budgetId);
      const updatedCategories = expensesResponse.map(expense => ({
        name: expense.category,
        amount: expense.amount,
        selected: false,
        image: getCategoryImage(expense.category),
      }));
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Erreur lors de la récupération des dépenses:', error);
      Alert.alert('Erreur', 'Erreur lors de la récupération des dépenses.');
    }
  };

  const getCategoryImage = (category) => {
    const images = {
      'Loyer': require('../assets/loyer.png'),
      'Internet': require('../assets/internet.png'),
      'Téléphone': require('../assets/telephone.png'),
      'Nourriture': require('../assets/nourriture.png'),
      'Vêtements': require('../assets/vetements.png'),
      'Sports': require('../assets/Sport.png'),
    };
    return images[category] || require('../assets/autres.png');
  };

  const toggleCategorySelection = (index) => {
    const newCategories = [...categories];
    newCategories[index].selected = !newCategories[index].selected;
    setCategories(newCategories);
  };

  const handleOtherChange = (field, value) => {
    setOther({ ...other, [field]: value });
  };

  const handleSubmit = async () => {
    const selectedCategories = categories.filter(category => category.selected).map(category => ({
      category: category.name,
      amount: category.amount,
    }));
    if (other.selected) {
      selectedCategories.push({
        category: 'Autre',
        amount: other.amount,
        comment: other.comment,
      });
    }

    try {
      await createTransactions(selectedBudget, selectedCategories);
      Alert.alert('Succès', 'Transactions ajoutées avec succès.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erreur lors de l\'ajout des transactions:', error);
      Alert.alert('Erreur', 'Erreur lors de l\'ajout des transactions.');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/retour.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.header}>Transactions</Text>
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Sélectionner votre budget</Text>
          <Picker
            selectedValue={selectedBudget}
            style={styles.picker}
            onValueChange={handleBudgetChange}
          >
            <Picker.Item label="Sélectionner votre budget" value={null} />
            {budgets.map(budget => (
              <Picker.Item key={budget.id} label={budget.category} value={budget.id} />
            ))}
          </Picker>
        </View>

        {selectedBudget && categories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <CheckBox
              value={category.selected}
              onValueChange={() => toggleCategorySelection(index)}
              tintColors={{ true: '#00A8E8', false: '#8E8E93' }}
            />
            <Image source={category.image} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}

        {selectedBudget && (
          <View style={styles.categoryContainer}>
            <CheckBox
              value={other.selected}
              onValueChange={() => setOther({ ...other, selected: !other.selected })}
              tintColors={{ true: '#00A8E8', false: '#8E8E93' }}
            />
            <Image source={require('../assets/autres.png')} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>Autre</Text>
          </View>
        )}

        {selectedBudget && other.selected && (
          <View style={styles.otherContainer}>
            <View style={styles.amountContainer}>
              <TextInput
                style={styles.input}
                placeholder="Montant"
                value={other.amount}
                onChangeText={(value) => handleOtherChange('amount', value)}
                keyboardType="numeric"
                placeholderTextColor="#8E8E93"
              />
              <Text style={styles.currencyText}>FCFA</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Commentaire"
              value={other.comment}
              onChangeText={(value) => handleOtherChange('comment', value)}
              placeholderTextColor="#8E8E93"
            />
          </View>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Valider</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    zIndex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  header: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 5,
  },
  picker: {
    width: '100%',
    height: 40,
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    color: 'black',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  categoryIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  otherContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
    color: '#1A1A1A',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  currencyText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1A1A1A',
  },
  submitButton: {
    backgroundColor: '#005D8C',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectCategories;
