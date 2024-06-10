// File: Preloader.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Animated, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';

const Preloader = ({ onFinished }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [logoAnim] = useState(new Animated.ValueXY({ x: -300, y: -50 })); // Starting position of the logo
  const [fadeAnim] = useState(new Animated.Value(1)); // Fade-in effect

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationPhase(1);
    }, 1500);

    const timer2 = setTimeout(() => {
      setAnimationPhase(2);
      Animated.timing(logoAnim, {
        toValue: { x: 0, y: -100 }, // Move to the center, above the text
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start(() => {
            onFinished();
          });
        }, 1000); // Pause briefly before fading out
      });
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [logoAnim, fadeAnim, onFinished]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {animationPhase === 0 && (
        <>
          <LottieView
            source={require('./circle-loading-animation.json')}
            autoPlay
            loop={false}
            style={styles.animation}
          />
          <Text style={styles.loadingText}>Chargement...</Text>
        </>
      )}
      {animationPhase >= 1 && (
        <Text style={styles.text}>WiseNkap</Text>
      )}
      {animationPhase === 2 && (
        <Animated.Image
          source={require('../assets/logo.png')} // Chemin vers votre logo PNG
          style={[styles.logo, { transform: logoAnim.getTranslateTransform() }]}
        />
      )}
    </Animated.View>
  );
};

Preloader.propTypes = {
  onFinished: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  animation: {
    width: 150,
    height: 150,
  },
  loadingText: {
    fontSize: 16,
    color: '#1A1A1A',
    marginTop: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute', // Absolute to overlay correctly
  },
});

export default Preloader;
