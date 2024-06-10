import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Footer from '../components/Footer';
const SecuritySettings = () => {
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleFaceID = () => setIsFaceIDEnabled(previousState => !previousState);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Code de Sécurité et Face ID</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nouveau Mot de Passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrer le mot de passe"
          placeholderTextColor="#8E8E93"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmer le Mot de Passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          placeholderTextColor="#8E8E93"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isPasswordVisible}
        />
      </View>

      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Text style={styles.showPassword}>{isPasswordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}</Text>
      </TouchableOpacity>

      <View style={styles.settingContainer}>
        <Text style={styles.label}>Activer Face ID</Text>
        <Switch
          onValueChange={toggleFaceID}
          value={isFaceIDEnabled}
          thumbColor={isFaceIDEnabled ? "#00A8E8" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => { }}>
        <Text style={styles.saveButtonText}>Enregistrer</Text>
      </TouchableOpacity>
      <Footer/>
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
  inputContainer: {
    marginBottom: 15,
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
  },
  showPassword: {
    color: '#1E90FF',
    textAlign: 'right',
    marginBottom: 20,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SecuritySettings;
