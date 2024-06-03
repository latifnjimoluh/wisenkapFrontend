import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, Image, ImageBackground } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isLongEnough = password.length > 8;

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Inscrivez-vous avec l'adresse email de votre choix.</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Votre adresse email"
            placeholderTextColor="#8E8E93"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Votre mot de passe"
              placeholderTextColor="#8E8E93"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Image
                source={isPasswordVisible ? require('../assets/close.png') : require('../assets/open.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.passwordCriteria}>
            <View style={styles.criteriaItem}>
              <CheckBox
                value={hasLetter}
                tintColors={{ true: '#34C759', false: 'black' }}
                disabled
              />
              <Text style={styles.criteriaText}>Une lettre</Text>
            </View>
            <View style={styles.criteriaItem}>
              <CheckBox
                value={hasNumber}
                tintColors={{ true: '#34C759', false: 'black' }}
                disabled
              />
              <Text style={styles.criteriaText}>Un chiffre</Text>
            </View>
            <View style={styles.criteriaItem}>
              <CheckBox
                value={isLongEnough}
                tintColors={{ true: '#34C759', false: 'black' }}
                disabled
              />
              <Text style={styles.criteriaText}>Plus de 8 caractères</Text>
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              tintColors={{ true: '#34C759', false: 'black' }}
            />
            <Text style={styles.checkboxText}>
              J'accepte les nouvelles <Text style={styles.linkText} onPress={() => Linking.openURL('#')}>Conditions Générales d'Utilisation</Text> de la <Text style={styles.linkText} onPress={() => Linking.openURL('#')}>politique de confidentialité</Text> de WiseNkap'.
            </Text>
          </View>

          <TouchableOpacity style={[styles.signupButton, (!isChecked || !hasLetter || !hasNumber || !isLongEnough) && styles.signupButtonDisabled]} disabled={!isChecked || !hasLetter || !hasNumber || !isLongEnough}>
            <Text style={styles.signupButtonText}>S'inscrire</Text>
          </TouchableOpacity>

          <Text style={styles.loginText}>
            Déjà un compte ? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Se connecter</Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#e1e4e8',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'black',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e1e4e8',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  inputPassword: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: 'black',
  },
  eyeIcon: {
    width: 60,
    height: 60,
  },
  passwordCriteria: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  criteriaText: {
    color: '#1E90FF',
    fontSize: 10,
    marginLeft: 5,
  },
  checkboxContainer: {
    marginTop:20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    flex: 1,
    marginLeft: 10,
    color: 'black',
  },
  linkText: {
    color: '#1E90FF',
  },
  signupButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'black',
  },
  loginLink: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});

export default Signup;
