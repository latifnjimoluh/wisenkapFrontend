import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, BackHandler, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DataExport = ({ navigation }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  useEffect(() => {
    // Gestion du bouton retour du téléphone
    const backAction = () => {
      navigation.navigate('Profile'); // Rediriger vers la page d'accueil
      return true; // Prévenir le comportement par défaut
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Nettoyage de l'écouteur
    return () => backHandler.remove();
  }, [navigation]);

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleConfirmStartDate = (date) => {
    const formattedDate = date.toLocaleDateString('fr-FR');
    setStartDate(formattedDate);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleConfirmEndDate = (date) => {
    const formattedDate = date.toLocaleDateString('fr-FR');
    setEndDate(formattedDate);
    hideEndDatePicker();
  };

  const handleExport = () => {
    if (new Date(startDate) > new Date(endDate)) {
      alert("La date de début doit être inférieure à la date de fin.");
      return;
    }
    // Logique pour gérer l'exportation des données
    console.log({ startDate, endDate });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Export de données</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date de début</Text>
        <TouchableOpacity onPress={showStartDatePicker}>
          <TextInput
            style={styles.input}
            placeholder="JJ/MM/AAAA"
            placeholderTextColor="#8E8E93"
            value={startDate}
            editable={false}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmStartDate}
          onCancel={hideStartDatePicker}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date de fin</Text>
        <TouchableOpacity onPress={showEndDatePicker}>
          <TextInput
            style={styles.input}
            placeholder="JJ/MM/AAAA"
            placeholderTextColor="#8E8E93"
            value={endDate}
            editable={false}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmEndDate}
          onCancel={hideEndDatePicker}
        />
      </View>

      <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
        <Text style={styles.exportButtonText}>Exporter</Text>
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
  exportButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  exportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DataExport;
