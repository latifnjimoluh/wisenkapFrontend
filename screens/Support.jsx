import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, BackHandler } from 'react-native';

const Support = ({ navigation }) => {
  useEffect(() => {
    // Gestion du retour matériel
    const backAction = () => {
      navigation.navigate('Profile'); // Rediriger vers la page d'accueil
      return true; // Prévenir le comportement par défaut
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Support</Text>

      <Text style={styles.description}>
        Besoin d'aide ? Utilisez les ressources ci-dessous ou contactez notre support pour obtenir une assistance rapide.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Guides de démarrage</Text>
        <TouchableOpacity style={styles.button} onPress={() => {/* Navigation vers le guide de démarrage */}}>
          <Text style={styles.buttonText}>Guide de démarrage rapide</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {/* Navigation vers les vidéos tutoriels */}}>
          <Text style={styles.buttonText}>Vidéos tutoriels</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Questions Fréquemment Posées (FAQ)</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FAQ')}>
          <Text style={styles.buttonText}>Voir la FAQ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Contacter le Support</Text>
        <TouchableOpacity style={styles.button} onPress={() => {/* Logique de support */}}>
          <Text style={styles.buttonText}>Envoyer un Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {/* Logique de support */}}>
          <Text style={styles.buttonText}>Appeler le Support</Text>
        </TouchableOpacity>
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
  description: {
    fontSize: 16,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Support;
