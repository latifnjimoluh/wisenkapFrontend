import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { getUserDetails, getBudgets } from '../api'; 
import { Picker } from '@react-native-picker/picker';

const Home = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [balance, setBalance] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await getUserDetails();
        setUserName(userResponse.firstName);

        const budgetResponse = await getBudgets();
        setBudgets(budgetResponse);
        if (budgetResponse.length > 0) {
          setSelectedBudget(budgetResponse[0].id);
          setBalance(budgetResponse[0].amount);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        Alert.alert('Erreur', 'Erreur lors de la récupération des données utilisateur.');
      }
    };

    fetchUserData();
  }, []);

  const handleBudgetChange = (itemValue) => {
    const selected = budgets.find(budget => budget.id === itemValue);
    setSelectedBudget(itemValue);
    setBalance(selected.amount);
    setShowPicker(false);  // Hide picker after selection
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.welcomeText}>Bienvenue, {userName}!</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.notificationIcon}>
          <Image source={require('../assets/user.png')} style={styles.iconImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceContainer}>
        <TouchableOpacity style={styles.balanceTextContainer} onPress={() => setShowPicker(!showPicker)}>
          <Text style={styles.balanceText}>
            Solde Actuel: {selectedBudget ? budgets.find(b => b.id === selectedBudget).category : 'Sélectionner votre budget'}
          </Text>
          <Image source={require('../assets/dropdown_arrow.png')} style={styles.dropdownIcon} />
        </TouchableOpacity>
        {showPicker && (
          <View style={styles.pickerContainer}>
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
        )}
        <Text style={styles.balanceAmount}>{balance} FCFA</Text>
      </View>

      <View style={styles.featuresContainer}>
        <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/user.png')} style={styles.iconImage} />
          <Text style={styles.featureText}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate('Budgets')}>
          <Image source={require('../assets/Budgets.png')} style={styles.iconImage} />
          <Text style={styles.featureText}>Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate('SelectCategories')}>
          <Image source={require('../assets/transactions.png')} style={styles.iconImage} />
          <Text style={styles.featureText}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate('Savings')}>
          <Image source={require('../assets/Epargne.png')} style={styles.iconImage} />
          <Text style={styles.featureText}>Épargne</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate('NotificationsAlerts')}>
          <Image source={require('../assets/notifications.png')} style={styles.iconImage} />
          <Text style={styles.featureText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate('Coaching')}>
          <Image source={require('../assets/coaching.png')} style={styles.iconImage} />
          <Text style={styles.featureText}>Coaching</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Support')}>
          <Text style={styles.footerLink}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
          <Text style={styles.footerLink}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.footerLink}>Réglages</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00A8E8',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: 'bold',
  },
  notificationIcon: {
    padding: 10,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  balanceContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  balanceTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceText: {
    fontSize: 18,
    color: '#1A1A1A',
  },
  dropdownIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 10,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A8E8',
  },
  picker: {
    width: '100%',
    height: 40,
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    color: 'black',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    color: '#1A1A1A',
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  footerLink: {
    fontSize: 14,
    color: '#00A8E8',
    textDecorationLine: 'underline',
  },
});

export default Home;
