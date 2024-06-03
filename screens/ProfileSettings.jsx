import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';

const ProfileSettings = () => {
  const [email, setEmail] = useState('latifnjimoluh@gmail.com');
  const [password, setPassword] = useState('********');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Profil et Mot de Passe</Text>
      
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem} onPress={togglePasswordVisibility}>
          <Text style={styles.label}>Mot de passe</Text>
          <View style={styles.passwordContainer}>
            <Text style={styles.value}>{isPasswordVisible ? password : '********'}</Text>
            <Image
              source={isPasswordVisible ? require('../assets/close.png') : require('../assets/open.png')}
              style={styles.eyeIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.label}>Numéro de téléphone</Text>
          <Text style={styles.value}>{phone}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.label}>Prénom</Text>
          <Text style={styles.value}>{firstName}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.label}>Genre</Text>
          <Text style={styles.value}>{gender}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.label}>Date de naissance</Text>
          <Text style={styles.value}>{dob}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.label}>Pays</Text>
          <Text style={styles.value}>{country}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.label}>Code postal</Text>
          <Text style={styles.value}>{postalCode}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Si vous souhaitez supprimer votre compte et toutes ses données, cliquez sur le lien ci-dessous
        </Text>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Supprimer mon compte WiseNkap</Text>
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
