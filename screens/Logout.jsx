import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import { logout } from '../api';

const Logout = ({ navigation }) => {
  useEffect(() => {
    // Gestion du bouton retour du téléphone
    const backAction = () => {
      navigation.navigate('Settings'); // Rediriger vers la page d'accueil
      return true; // Prévenir le comportement par défaut
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Nettoyage de l'écouteur
    return () => backHandler.remove();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      const response = await logout();
      Alert.alert('Succès', response.message);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la déconnexion.');
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Déconnexion</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Confirmer la déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A8E8',
    marginBottom: 20,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Logout;
