import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendResetCodeEmail } from '../api';

const ResetAuthCodeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse e-mail.');
      return;
    }

    try {
      await sendResetCodeEmail(email);
      Alert.alert('Succès', 'Un email avec un code de réinitialisation a été envoyé.');
      navigation.navigate('ConfirmResetAuthCode', { email }); // Transmettez l'email ici
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de l\'envoi de l\'e-mail de réinitialisation.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Réinitialiser le Code de Sécurité</Text>
      <TextInput
        style={styles.input}
        placeholder="Votre adresse e-mail"
        placeholderTextColor="#8E8E93"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleReset}>
        <Text style={styles.submitButtonText}>Envoyer</Text>
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

export default ResetAuthCodeScreen;
