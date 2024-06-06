import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getUserDetails, updateUserDetails } from '../api';
import { Picker } from '@react-native-picker/picker';

const ProfileSettings = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserDetails();
        setEmail(user.email);
        setPhone(user.phone || '');
        setFirstName(user.firstName || '');
        setGender(user.gender || '');
        setDob(new Date(user.dob || Date.now()));
        setCountry(user.country || '');
        setPostalCode(user.postalCode || '');
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await updateUserDetails({ phone, firstName, gender, dob, country, postalCode });
      Alert.alert('Succès', response.message);
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la mise à jour des informations.');
      console.error('Erreur lors de la mise à jour des informations utilisateur:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/retour.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerH}>Profil et mot de passe</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.value}
              value={email}
              editable={false}
            />
          </View>

          <TouchableOpacity style={styles.infoItem} onPress={togglePasswordVisibility}>
            <Text style={styles.label}>Mot de passe</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.value}
                value={isPasswordVisible ? password : ''}
                editable={false}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image
                  source={isPasswordVisible ? require('../assets/close.png') : require('../assets/open.png')}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput
              style={styles.value}
              value={phone}
              onChangeText={setPhone}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Prénom</Text>
            <TextInput
              style={styles.value}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Genre</Text>
            <Picker
              selectedValue={gender}
              style={styles.value}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Sélectionner un genre" value="" />
              <Picker.Item label="Masculin" value="Masculin" />
              <Picker.Item label="Féminin" value="Féminin" />
            </Picker>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Date de naissance</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.value}>{dob.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || dob;
                  setShowDatePicker(false);
                  setDob(currentDate);
                }}
              />
            )}
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Pays</Text>
            <TextInput
              style={styles.value}
              value={country}
              onChangeText={setCountry}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Code postal</Text>
            <TextInput
              style={styles.value}
              value={postalCode}
              onChangeText={setPostalCode}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Enregistrer</Text>
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
  headerContainer: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerH: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
  infoContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
  },
  infoItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  value: {
    fontSize: 16,
    color: '#00A8E8',
    marginTop: 5,
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 10,
  },
  footerLink: {
    fontSize: 14,
    color: '#00A8E8',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default ProfileSettings;
