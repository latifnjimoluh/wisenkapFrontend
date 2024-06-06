import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, TextInput, FlatList } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Ionicons';

const NotificationsAlerts = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(null);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
    setAlerts([...alerts, { time: '', comment: '' }]);
  };

  const updateAlertComment = (index, comment) => {
    const newAlerts = [...alerts];
    newAlerts[index].comment = comment;
    setAlerts(newAlerts);
  };

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

      <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
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
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
    color: 'black', // couleur du texte lors de la saisie
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
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationsAlerts;
