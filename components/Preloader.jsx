// components/Preloader.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const Preloader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00A8E8" />
      <Text style={styles.text}>Chargement...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#00A8E8',
  },
});

export default Preloader;
