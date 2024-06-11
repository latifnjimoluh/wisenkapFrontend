import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthCodeScreen = ({ navigation }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const checkAuthCode = async () => {
      const storedCode = await AsyncStorage.getItem('authCode');
      if (!storedCode) {
        navigation.navigate('SecuritySettings');
      }
    };
    checkAuthCode();
  }, [navigation]);

  const handleSubmit = async () => {
    const storedCode = await AsyncStorage.getItem('authCode');
    if (code === storedCode) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Erreur', 'Code incorrect.');
      setCode('');
    }
  };

  const handleKeyPress = (digit) => {
    if (code.length < 4) {
      setCode(prev => prev + digit);
    }
  };

  const handleDelete = () => {
    setCode(prev => prev.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Entrer le code de sécurité</Text>
      <TextInput
        style={styles.hiddenInput}
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
      />
      <View style={styles.codeContainer}>
        {Array(4).fill('').map((_, index) => (
          <View key={index} style={styles.codeDigit}>
            <Text style={styles.codeDigitText}>
              {index < code.length ? '•' : ''}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.keyboardContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <TouchableOpacity
            key={num}
            style={styles.key}
            onPress={() => handleKeyPress(num.toString())}
          >
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.key} onPress={handleDelete}>
          <Text style={styles.keyText}>⌫</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={() => handleKeyPress('0')}>
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={handleSubmit}>
          <Text style={styles.keyText}>Entrer</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ResetAuthCode')}>
        <Text style={styles.forgotCodeText}>Code oublié?</Text>
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
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A8E8',
    marginBottom: 20,
  },
  hiddenInput: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    width: 0,
    height: 0,
  },
  codeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  codeDigit: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    backgroundColor: '#F0F0F0',
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeDigitText: {
    fontSize: 24,
    color: 'black',
  },
  keyboardContainer: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  key: {
    width: '30%',
    marginVertical: 10,
    backgroundColor: '#00A8E8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  keyText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  forgotCodeText: {
    marginTop: 20,
    color: '#1E90FF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default AuthCodeScreen;
