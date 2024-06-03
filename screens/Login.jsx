import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, Image, ImageBackground } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Ravis de vous revoir</Text>
          <Text style={styles.subtitle}>Entrez l'email et le mot de passe de votre compte WiseNkap'.</Text>
          
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
          
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={() => {/* Logique de connexion */}}>
            <Text style={styles.loginButtonText}>Se connecter</Text>
          </TouchableOpacity>

          <Text style={styles.signupText}>
            Vous débutez sur WiseNkap' ? <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>S'inscrire</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
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
  forgotPassword: {
    color: '#1E90FF',
    textAlign: 'left',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    textAlign: 'center',
    color: 'black',
  },
  signupLink: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});

export default Login;
