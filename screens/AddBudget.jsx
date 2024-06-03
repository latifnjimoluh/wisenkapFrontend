import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddBudget = ({ navigation }) => {
  const [budgetName, setBudgetName] = useState('');
  const [period, setPeriod] = useState('mois');
  const [startDate, setStartDate] = useState('');
  const [revenues, setRevenues] = useState([{ type: 'salaire', amount: '' }]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [daysList, setDaysList] = useState([]);

  const addRevenue = () => {
    setRevenues([...revenues, { type: '', amount: '' }]);
  };

  const updateRevenue = (index, field, value) => {
    const newRevenues = [...revenues];
    newRevenues[index][field] = value;
    setRevenues(newRevenues);
  };

  const handleSubmit = () => {
    const newBudget = { budgetName, period, startDate, revenues };
    console.log(newBudget);
    navigation.navigate('BudgetDetails', { budget: newBudget });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toLocaleDateString('fr-FR');
    setStartDate(formattedDate);
    hideDatePicker();
  };

  const handlePeriodSelection = (selectedPeriod) => {
    setPeriod(selectedPeriod);
    let days;
    if (selectedPeriod === 'semaine') {
      days = Array.from({ length: 7 }, (_, i) => `Jour ${i + 1}`);
    } else if (selectedPeriod === 'mois') {
      days = Array.from({ length: 30 }, (_, i) => `Jour ${i + 1}`);
    } else {
      days = Array.from({ length: 365 }, (_, i) => `Jour ${i + 1}`);
    }
    setDaysList(days);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('../assets/retour.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>Créer un Budget</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nom du Budget</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            placeholderTextColor="#8E8E93"
            value={budgetName}
            onChangeText={setBudgetName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Période</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={[styles.periodButton, period === 'semaine' && styles.selectedButton]}
              onPress={() => handlePeriodSelection('semaine')}
            >
              <Text style={styles.buttonText}>Semaine</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.periodButton, period === 'mois' && styles.selectedButton]}
              onPress={() => handlePeriodSelection('mois')}
            >
              <Text style={styles.buttonText}>Mois</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.periodButton, period === 'annee' && styles.selectedButton]}
              onPress={() => handlePeriodSelection('annee')}
            >
              <Text style={styles.buttonText}>Année</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date de Début</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={styles.input}
              placeholder="JJ/MM/AAAA"
              placeholderTextColor="#8E8E93"
              value={startDate}
              editable={false}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        {revenues.map((revenue, index) => (
          <View key={index} style={styles.revenueContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Type de Revenu</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity 
                  style={[styles.revenueButton, revenue.type === 'salaire' && styles.selectedButton]}
                  onPress={() => updateRevenue(index, 'type', 'salaire')}
                >
                  <Image source={require('../assets/Salaires.png')} style={styles.icon} />
                  <Text style={styles.buttonText}>Salaire</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.revenueButton, revenue.type === 'immobilier' && styles.selectedButton]}
                  onPress={() => updateRevenue(index, 'type', 'immobilier')}
                >
                  <Image source={require('../assets/Immobilier.png')} style={styles.icon} />
                  <Text style={styles.buttonText}>Immobilier</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.revenueButton, revenue.type === 'investissement' && styles.selectedButton]}
                  onPress={() => updateRevenue(index, 'type', 'investissement')}
                >
                  <Image source={require('../assets/investissement.png')} style={styles.icon} />
                  <Text style={styles.buttonText}>Investissement</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.revenueButton, revenue.type === 'autres' && styles.selectedButton]}
                  onPress={() => updateRevenue(index, 'type', 'autres')}
                >
                  <Image source={require('../assets/autres.png')} style={styles.icon} />
                  <Text style={styles.buttonText}>Autre</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Montant</Text>
              <TextInput
                style={styles.input}
                placeholder="Montant"
                placeholderTextColor="#8E8E93"
                value={revenue.amount}
                onChangeText={(value) => updateRevenue(index, 'amount', value)}
                keyboardType="numeric"
              />
              <View style={styles.amountContainer}>
                <Text style={styles.currencyText}>FCFA</Text>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addRevenue}>
          <Text style={styles.addButtonText}>Ajouter un Revenu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Créer</Text>
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
  scrollContainer: {
    paddingBottom: 20,
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
  inputContainer: {
    marginBottom: 15,
    paddingHorizontal: 20,
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
    color: 'black', // couleur du texte lors de la saisie
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  periodButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#EDEDED',
    marginHorizontal: 5,
  },
  revenueButton: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#EDEDED',
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#00A8E8', // Couleur plus claire pour le bouton sélectionné
  },
  buttonText: {
    color: 'black',
    fontSize: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  revenueContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
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
  addButton: {
    backgroundColor: '#00C853', // Couleur verte
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddBudget;
