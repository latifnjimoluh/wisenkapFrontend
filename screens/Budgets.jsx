import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView, Alert, BackHandler } from 'react-native';
import { getBudgets, deleteBudget, getActiveCurrency } from '../api';
import Footer from '../components/Footer';

const Budget = ({ navigation }) => {
  const [budgets, setBudgets] = useState([]);
  const [activeCurrency, setActiveCurrency] = useState({ code: 'FCFA' }); // Devise par défaut
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getBudgets();
        setBudgets(data);
      } catch (error) {
        setError('Erreur lors de la récupération des budgets');
      } finally {
        setLoading(false);
      }
    };

    const fetchActiveCurrency = async () => {
      try {
        const currency = await getActiveCurrency();
        setActiveCurrency(currency);
      } catch (error) {
        console.error('Erreur lors de la récupération de la devise active:', error);
      }
    };

    fetchBudgets();
    fetchActiveCurrency();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  const handleDeleteBudget = async (budgetId) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer ce budget?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          onPress: async () => {
            try {
              await deleteBudget(budgetId);
              setBudgets(budgets.filter(budget => budget.id !== budgetId));
              Alert.alert('Succès', 'Budget supprimé avec succès.');
            } catch (error) {
              Alert.alert('Erreur', 'Erreur lors de la suppression du budget.');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00A8E8" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/retour.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Budget</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          {budgets.length === 0 ? (
            <Text style={styles.noBudgetsText}>Aucun budget créé pour l'instant, bien vouloir créer un budget</Text>
          ) : (
            budgets.map((budget, index) => (
              <View key={index} style={styles.budgetItem}>
                <View style={styles.budgetInfo}>
                  <Text style={styles.budgetName}>{budget.category}</Text>
                  <Text style={styles.budgetAmount}>{budget.amount} {activeCurrency.code}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteBudget(budget.id)}
                >
                  <Text style={styles.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <Footer />
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
  scrollContainer: {
    paddingBottom: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#005D8C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  budgetList: {
    paddingHorizontal: 20,
  },
  budgetItem: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetInfo: {
    flex: 1,
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
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  noBudgetsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#1A1A1A',
  },
});

export default Budget;
