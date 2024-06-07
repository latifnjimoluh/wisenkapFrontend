// File path: /path/to/NotificationsAlerts.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAlerts, createAlert, updateAlert, deleteAlert } from '../api';

const NotificationsAlerts = ({
  navigation,
  initialIsEnabled = false,
  initialAlerts = [],
  initialIsDatePickerVisible = false,
  initialCurrentAlertIndex = null
}) => {
  const [isEnabled, setIsEnabled] = useState(initialIsEnabled);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(initialIsDatePickerVisible);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(initialCurrentAlertIndex);

  const toggleSwitch = () => setIsEnabled(prevState => !prevState);

  const showDatePicker = (index) => {
    setCurrentAlertIndex(index);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const newAlerts = [...alerts];
    newAlerts[currentAlertIndex].time = `${hours}:${minutes}`;
    setAlerts(newAlerts);
    hideDatePicker();
  };

  const addAlert = () => {
    setAlerts([...alerts, { time: '', comment: '', isActive: true }]);
  };

  const updateAlertComment = (index, comment) => {
    const newAlerts = [...alerts];
    newAlerts[index].comment = comment;
    setAlerts(newAlerts);
  };

  const toggleAlertActive = (index) => {
    const newAlerts = [...alerts];
    newAlerts[index].isActive = !newAlerts[index].isActive;
    setAlerts(newAlerts);
  };

  const saveAlerts = async () => {
    try {
      for (let alert of alerts) {
        if (alert.id) {
          await updateAlert(alert.id, alert);
        } else {
          await createAlert(alert);
        }
      }
      Alert.alert('Succès', 'Alertes enregistrées avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des alertes:', error);
      Alert.alert('Erreur', 'Erreur lors de l\'enregistrement des alertes.');
    }
  };

  const deleteExistingAlert = async (alertId) => {
    try {
      await deleteAlert(alertId);
      setAlerts(alerts.filter(alert => alert.id !== alertId));
      Alert.alert('Succès', 'Alerte supprimée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'alerte:', error);
      Alert.alert('Erreur', 'Erreur lors de la suppression de l\'alerte.');
    }
  };

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await getAlerts();
        setAlerts(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des alertes:', error);
        Alert.alert('Erreur', 'Erreur lors de la récupération des alertes.');
      }
    };

    fetchAlerts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Notifications & Alertes</Text>

      <View style={styles.settingContainer}>
        <Text style={styles.label}>Activer les notifications</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isEnabled}
          thumbColor={isEnabled ? "#00A8E8" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>

      {alerts.map((alert, index) => (
        <View key={index} style={styles.alertContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Heure de l'alerte</Text>
            <TouchableOpacity onPress={() => showDatePicker(index)}>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor="#8E8E93"
                value={alert.time}
                editable={false}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Commentaire</Text>
            <TextInput
              style={styles.input}
              placeholder="Commentaire"
              placeholderTextColor="#8E8E93"
              value={alert.comment}
              onChangeText={(text) => updateAlertComment(index, text)}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Activer l'alerte</Text>
            <Switch
              onValueChange={() => toggleAlertActive(index)}
              value={alert.isActive}
              thumbColor={alert.isActive ? "#00A8E8" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteExistingAlert(alert.id)}>
              <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour={true}
      />

      <TouchableOpacity style={styles.addButton} onPress={addAlert}>
        <Text style={styles.addButtonText}>Ajouter une alerte</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={saveAlerts}>
        <Text style={styles.saveButtonText}>Enregistrer</Text>
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
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  alertContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
    color: 'black',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#00A8E8',
    fontSize: 16,
    marginLeft: 5,
  },
  saveButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationsAlerts;
