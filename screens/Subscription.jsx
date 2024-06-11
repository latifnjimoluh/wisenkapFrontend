import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, BackHandler } from 'react-native';

const Subscription = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: 1, name: 'Plan Gratuit', price: '0 FCFA/mois', benefits: ['Accès limité', 'Support par email'] },
    { id: 2, name: 'Plan Standard', price: '5,000 FCFA/mois', benefits: ['Accès complet', 'Support prioritaire', 'Sans publicité'] },
    { id: 3, name: 'Plan Premium', price: '10,000 FCFA/mois', benefits: ['Accès complet', 'Support premium', 'Fonctionnalités avancées', 'Sans publicité'] },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    Alert.alert(
      "Confirmation",
      `Voulez-vous souscrire au ${plan.name} pour ${plan.price} ?`,
      [
        { text: "Annuler", onPress: () => {}, style: "cancel" },
        { text: "Confirmer", onPress: () => console.log(`Abonnement au ${plan.name} confirmé.`) },
      ]
    );
  };

  useEffect(() => {
    // Gestion du retour matériel
    const backAction = () => {
      navigation.navigate('Settings'); // Rediriger vers la page d'accueil
      return true; // Prévenir le comportement par défaut
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Actualiser mon Abonnement</Text>

      {plans.map((plan) => (
        <View key={plan.id} style={styles.planContainer}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planPrice}>{plan.price}</Text>
          <View style={styles.benefitsContainer}>
            {plan.benefits.map((benefit, index) => (
              <Text key={index} style={styles.benefitText}>• {benefit}</Text>
            ))}
          </View>
          <TouchableOpacity style={styles.selectButton} onPress={() => handleSelectPlan(plan)}>
            <Text style={styles.selectButtonText}>Sélectionner</Text>
          </TouchableOpacity>
        </View>
      ))}

      {selectedPlan && (
        <View style={styles.selectedPlanContainer}>
          <Text style={styles.selectedPlanText}>Vous avez sélectionné : {selectedPlan.name}</Text>
        </View>
      )}
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
  planContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 10,
  },
  benefitsContainer: {
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  selectButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedPlanContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    textAlign: 'center',
  },
  selectedPlanText: {
    fontSize: 14,
    color: '#00A8E8',
    textAlign: 'center',
  },
});

export default Subscription;
