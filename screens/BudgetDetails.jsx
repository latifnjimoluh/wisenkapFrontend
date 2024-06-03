import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Image, SafeAreaView } from 'react-native';

const BudgetDetails = ({ navigation }) => {
  const [expenses, setExpenses] = useState([
    { category: 'Loyer', amount: '1000 FCFA', image: require('../assets/loyer.png') },
    { category: 'Internet', amount: '5000 FCFA', image: require('../assets/internet.png') },
    { category: 'Téléphone', amount: '100 FCFA', image: require('../assets/telephone.png') },
    { category: 'Nourriture', amount: '0 FCFA', image: require('../assets/nourriture.png') },
    { category: 'Sport', amount: '0 FCFA', image: require('../assets/Sport.png') },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (newCategory) {
      setExpenses([...expenses, { category: newCategory, amount: '0 FCFA', image: require('../assets/autres.png') }]);
      setNewCategory('');
      setModalVisible(false);
    }
  };

  const updateExpense = (index, field, value) => {
    const newExpenses = [...expenses];
    newExpenses[index][field] = value;
    setExpenses(newExpenses);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('../assets/retour.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>Transactions</Text>
        </View>
        <Text style={styles.subHeader}>
          Ces dépenses devraient être assez régulières d'une période à une autre.
        </Text>

        {expenses.map((expense, index) => (
          <View key={index} style={styles.expenseContainer}>
            <Image source={expense.image} style={styles.icon} />
            <Text style={styles.expenseText}>{expense.category}</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencyText}>FCFA</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                value={expense.amount.replace(' FCFA', '')}
                onChangeText={(value) => updateExpense(index, 'amount', `${value} FCFA`)}
                keyboardType="numeric"
                placeholderTextColor="#8E8E93"
              />
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Ajouter une catégorie</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('NextScreen')}>
          <Text style={styles.continueButtonText}>Continuer</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Nouvelle Catégorie</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Nom de la catégorie"
                value={newCategory}
                onChangeText={setNewCategory}
                placeholderTextColor="#8E8E93"
              />
              <TouchableOpacity style={styles.modalButton} onPress={addCategory}>
                <Text style={styles.modalButtonText}>Ajouter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingBottom: 80,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  header: {
    backgroundColor: '#00A8E8',
    marginTop:20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 20,
  },
  expenseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  expenseText: {
    fontSize: 16,
    color: '#1A1A1A',
    flex: 1,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 16,
    color: '#1A1A1A',
    marginRight: 5,
  },
  amountInput: {
    width: 100,
    height: 40,
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    textAlign: 'right',
    color: '#1A1A1A',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#005D8C',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonCancel: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BudgetDetails;
