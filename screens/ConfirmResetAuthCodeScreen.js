// ConfirmResetAuthCodeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyResetCode } from '../api';

const ConfirmResetAuthCodeScreen = ({ route, navigation }) => {
  const [resetCode, setResetCode] = useState('');
  const [newCode, setNewCode] = useState('');
  const [confirmNewCode, setConfirmNewCode] = useState('');

  const handleConfirm = async () => {
    if (!resetCode || !newCode || !confirmNewCode) {
      Alert.alert('Erreur', 'Tous les champs sont requis.');
      return;
    }

    if (newCode !== confirmNewCode) {
      Alert.alert('Erreur', 'Les nouveaux codes ne correspondent pas.');
      return;
    }

    try {
      const isValid = await verifyResetCode({ resetCode, email: route.params.email });
      if (isValid) {
        await AsyncStorage.setItem('authCode', newCode);
        Alert.alert('Succès', 'Code de sécurité réinitialisé.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erreur', 'Code de réinitialisation invalide ou expiré.');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la vérification du code de réinitialisation.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Confirmer la Réinitialisation</Text>
      <TextInput
        style={styles.input}
        placeholder="Code de réinitialisation"
        placeholderTextColor="#8E8E93"
        value={resetCode}
        onChangeText={setResetCode}
        keyboardType="numeric"
        maxLength={6}
      />
      <TextInput
        style={styles.input}
        placeholder="Nouveau code de sécurité"
        placeholderTextColor="#8E8E93"
        value={newCode}
        onChangeText={setNewCode}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmer le nouveau code"
        placeholderTextColor="#8E8E93"
        value={confirmNewCode}
        onChangeText={setConfirmNewCode}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleConfirm}>
        <Text style={styles.submitButtonText}>Réinitialiser</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A8E8',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmResetAuthCodeScreen;
