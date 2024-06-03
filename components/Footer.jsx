import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/home.png')} style={styles.icon}/>
        <Text style={styles.buttonText}>Acceuil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Budgets')}>
        <Image source={require('../assets/Budgets.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Budget</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SelectCategories')}>
        <Image source={require('../assets/transactions.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Transactions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
        <Image source={require('../assets/Settings.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Reglages</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#EDEDED',
  },
  button: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,

  },
  buttonText: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Footer;
