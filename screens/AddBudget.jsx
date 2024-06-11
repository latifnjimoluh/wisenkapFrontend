import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createBudget, getActiveCurrency } from '../api'; 
import Footer from '../components/Footer';

const AddBudget = ({ navigation }) => {
  const [budgetName, setBudgetName] = useState('');
  const [period, setPeriod] = useState('mois');
  const [day, setDay] = useState('1');
  const [month, setMonth] = useState('Janvier');
  const [weekDay, setWeekDay] = useState('Lundi');
  const [revenues, setRevenues] = useState([]);
  const [daysList, setDaysList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRevenueType, setSelectedRevenueType] = useState('salaire');
  const [activeCurrency, setActiveCurrency] = useState({}); // État pour la devise active

  const revenueTypes = [
    { type: 'salaire', icon: require('../assets/Salaires.png'), label: 'Salaire' },
    { type: 'immobilier', icon: require('../assets/Immobilier.png'), label: 'Immobilier' },
    { type: 'investissement', icon: require('../assets/investissement.png'), label: 'Investissement' },
    { type: 'autres', icon: require('../assets/autres.png'), label: 'Autres' },
  ];

  const monthsList = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  useEffect(() => {
    if (period === 'semaine') {
      setDaysList(['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']);
      setWeekDay('Lundi');
    } else if (period === 'mois' || period === 'annee') {
      setDaysList(Array.from({ length: 31 }, (_, i) => `${i + 1}`));
      setDay('1');
    }
  }, [period]);

  useEffect(() => {
    // Récupérer la devise active
    const fetchActiveCurrency = async () => {
      try {
        const currency = await getActiveCurrency();
        setActiveCurrency(currency);
      } catch (error) {
        console.error('Erreur lors de la récupération de la devise active:', error);
      }
    };

    fetchActiveCurrency();
  }, []);

  const addRevenue = () => {
    setRevenues([...revenues, { type: selectedRevenueType, amount: '' }]);
    setModalVisible(false);
  };

  const updateRevenue = (index, field, value) => {
    const newRevenues = [...revenues];
    newRevenues[index][field] = value;
    setRevenues(newRevenues);
  };

  const removeRevenue = (index) => {
    const newRevenues = revenues.filter((_, i) => i !== index);
    setRevenues(newRevenues);
  };

  const validateForm = () => {
    if (!budgetName) {
      Alert.alert('Erreur', 'Veuillez entrer un nom de budget.');
      return false;
    }
    for (let revenue of revenues) {
      if (!revenue.amount || revenue.amount === '0') {
        Alert.alert('Erreur', 'Veuillez entrer un montant pour chaque revenu.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    let startDate = '';
    if (period === 'semaine') {
      startDate = weekDay;
    } else if (period === 'mois') {
      startDate = day;
    } else if (period === 'annee') {
      startDate = `${month} ${day}`;
    }

    const newBudget = { budgetName, period, startDate, revenues };

    try {
      const response = await createBudget(newBudget);
      Alert.alert('Succès', 'Budget créé avec succès.');
      navigation.navigate('BudgetDetails', { budgetId: response.budgetId });
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la création du budget.');
    }
  };

  const handlePeriodSelection = (selectedPeriod) => {
    setPeriod(selectedPeriod);
  };

  const isSubmitDisabled = revenues.length === 0 || revenues.some(revenue => !revenue.amount || revenue.amount === '0');

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
              <Text style={[styles.buttonText, period === 'semaine' && styles.selectedButtonText]}>Semaine</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, period === 'mois' && styles.selectedButton]}
              onPress={() => handlePeriodSelection('mois')}
            >
              <Text style={[styles.buttonText, period === 'mois' && styles.selectedButtonText]}>Mois</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, period === 'annee' && styles.selectedButton]}
              onPress={() => handlePeriodSelection('annee')}
            >
              <Text style={[styles.buttonText, period === 'annee' && styles.selectedButtonText]}>Année</Text>
            </TouchableOpacity>
          </View>
        </View>

        {period === 'semaine' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Jour de la semaine</Text>
            <Picker
              selectedValue={weekDay}
              onValueChange={(itemValue) => setWeekDay(itemValue)}
              style={styles.picker}
            >
              {daysList.map((day, index) => (
                <Picker.Item key={index} label={day} value={day} />
              ))}
            </Picker>
          </View>
        )}

        {period === 'mois' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Jour du mois</Text>
            <Picker
              selectedValue={day}
              onValueChange={(itemValue) => setDay(itemValue)}
              style={styles.picker}
            >
              {daysList.map((day, index) => (
                <Picker.Item key={index} label={day} value={day} />
              ))}
            </Picker>
          </View>
        )}

        {period === 'annee' && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mois de l'année</Text>
              <Picker
                selectedValue={month}
                onValueChange={(itemValue) => setMonth(itemValue)}
                style={styles.picker}
              >
                {monthsList.map((month, index) => (
                  <Picker.Item key={index} label={month} value={month} />
                ))}
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Jour du mois</Text>
              <Picker
                selectedValue={day}
                onValueChange={(itemValue) => setDay(itemValue)}
                style={styles.picker}
              >
                {daysList.map((day, index) => (
                  <Picker.Item key={index} label={day} value={day} />
                ))}
              </Picker>
            </View>
          </>
        )}

        {revenues.map((revenue, index) => (
          <View key={index} style={styles.revenueContainer}>
            <View style={styles.revenueHeader}>
              <Image source={revenueTypes.find(rt => rt.type === revenue.type)?.icon} style={styles.revenueIcon} />
              <Text style={styles.revenueTypeText}>{revenueTypes.find(rt => rt.type === revenue.type)?.label}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Montant</Text>
              <View style={styles.amountInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Montant"
                  placeholderTextColor="#8E8E93"
                  value={revenue.amount}
                  onChangeText={(value) => updateRevenue(index, 'amount', value)}
                  keyboardType="numeric"
                />
                <Text style={styles.currencyText}>{activeCurrency.code || 'FCFA'}</Text>
              </View>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeRevenue(index)}>
                <Text style={styles.removeButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Ajouter un Revenu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.submitButton, isSubmitDisabled && styles.disabledButton]} onPress={handleSubmit} disabled={isSubmitDisabled}>
          <Text style={styles.submitButtonText}>Créer</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Choisir un type de revenu</Text>
              {revenueTypes.map((revenueType) => (
                <TouchableOpacity
                  key={revenueType.type}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedRevenueType(revenueType.type);
                    addRevenue();
                  }}
                >
                  <Image source={revenueType.icon} style={styles.modalIcon} />
                  <Text style={styles.modalItemText}>{revenueType.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCloseButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <Footer />
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
    color: 'black',
    flex: 1,
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  periodButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#EDEDED',
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#00A8E8',
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
  },
  selectedButtonText: {
    color: 'white',
  },
  revenueContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    paddingBottom: 10,
  },
  revenueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  revenueIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  revenueTypeText: {
    fontSize: 16,
    color: '#00A8E8',
    flex: 1,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1A1A1A',
  },
  addButton: {
    backgroundColor: '#00C853',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#FF5252',
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
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
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1A1A1A',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#EDEDED',
    marginVertical: 5,
  },
  modalIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  modalItemText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#00A8E8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddBudget;
