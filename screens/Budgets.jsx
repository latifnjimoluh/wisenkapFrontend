import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const budgets = [
  { name: 'Budget Mensuel', amount: '5000 FCFA' },
  { name: 'Budget Annuel', amount: '60000 FCFA' }
];

const Budget = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/retour.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Budget</Text>
      </View>

      <View style={styles.content}>
        <Image
          source={require('../assets/Budgets.png')} 
          style={styles.image}
        />
        <Text style={styles.title}>Découvrez Budget</Text>
        <Text style={styles.description}>
          Le Budget vous aide à maîtriser vos dépenses et anticiper vos soldes en fin de mois.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddBudget')}>
          <Text style={styles.buttonText}>Créer un Budget</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.budgetList}>
        {budgets.map((budget, index) => (
          <View key={index} style={styles.budgetItem}>
            <Text style={styles.budgetName}>{budget.name}</Text>
            <Text style={styles.budgetAmount}>{budget.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#005D8C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  budgetList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  budgetItem: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  budgetAmount: {
    fontSize: 16,
    color: '#00A8E8',
  },
});

export default Budget;
