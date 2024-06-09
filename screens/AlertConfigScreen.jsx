// src/AlertConfigScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Switch } from 'react-native';

const AlertConfigScreen = ({ navigation }) => {
  const [time, setTime] = useState('');
  const [repeat, setRepeat] = useState({
    dimanche: false,
    lundi: false,
    mardi: false,
    mercredi: false,
    jeudi: false,
    vendredi: false,
    samedi: false,
  });

  const handleSave = () => {
    // Logique pour sauvegarder la nouvelle alerte
    navigation.goBack(); // Retourne à l'écran précédent
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Heure de l'alerte:</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        value={time}
        onChangeText={setTime}
      />
      <Text style={styles.label}>Répéter:</Text>
      {Object.keys(repeat).map((day) => (
        <View key={day} style={styles.switchRow}>
          <Text>{day}</Text>
          <Switch
            value={repeat[day]}
            onValueChange={(value) => setRepeat({ ...repeat, [day]: value })}
          />
        </View>
      ))}
      <Button title="Sauvegarder" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default AlertConfigScreen;
