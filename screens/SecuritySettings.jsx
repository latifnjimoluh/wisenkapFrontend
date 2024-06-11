import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, ScrollView, Alert, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';

const SecuritySettings = ({ navigation }) => {
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleFaceID = () => setIsFaceIDEnabled(previousState => !previousState);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSave = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les nouveaux codes ne correspondent pas.');
      return;
    }
    if (password.length !== 4) {
      Alert.alert('Erreur', 'Le nouveau code doit être de 4 chiffres.');
      return;
    }
    try {
      const storedCode = await AsyncStorage.getItem('authCode');
      if (storedCode !== oldPassword) {
        Alert.alert('Erreur', 'L\'ancien code ne correspond pas.');
        return;
      }

      await AsyncStorage.setItem('authCode', password);
      Alert.alert('Succès', 'Code de sécurité enregistré.');
      navigation.navigate('Settings');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la sauvegarde du code de sécurité.');
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Settings');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Code de Sécurité et Face ID</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ancien Code de Sécurité</Text>
        <TextInput
          style={styles.input}
          placeholder="****"
          placeholderTextColor="#8E8E93"
          value={oldPassword}
          onChangeText={setOldPassword}
          keyboardType="numeric"
          secureTextEntry={!isPasswordVisible}
          maxLength={4}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nouveau Code de Sécurité</Text>
        <TextInput
          style={styles.input}
          placeholder="****"
          placeholderTextColor="#8E8E93"
          value={password}
          onChangeText={setPassword}
          keyboardType="numeric"
          secureTextEntry={!isPasswordVisible}
          maxLength={4}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmer le Nouveau Code de Sécurité</Text>
        <TextInput
          style={styles.input}
          placeholder="****"
          placeholderTextColor="#8E8E93"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          keyboardType="numeric"
          secureTextEntry={!isPasswordVisible}
          maxLength={4}
        />
      </View>

      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Text style={styles.showPassword}>{isPasswordVisible ? "Masquer le code" : "Afficher le code"}</Text>
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

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Enregistrer</Text>
      </TouchableOpacity>
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
