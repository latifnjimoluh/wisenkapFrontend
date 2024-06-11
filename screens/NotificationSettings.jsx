import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getNotificationSettings, updateNotificationSettings } from '../api';
import { scheduleNotification, cancelAllNotifications, requestUserPermission, getFCMToken } from './notifications';

const NotificationSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState('00:00');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getNotificationSettings();
        if (settings) {
          setNotificationsEnabled(settings.isEnabled);
          const time = new Date(`1970-01-01T${settings.notificationTime}Z`);
          setNotificationTime(time);
          setFormattedTime(formatTime(time));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const initNotifications = async () => {
      await requestUserPermission();
      const token = await getFCMToken();
      console.log('FCM Token:', token);
    };
    initNotifications();
  }, []);

  const saveSettings = async () => {
    try {
      await updateNotificationSettings({
        isEnabled: notificationsEnabled,
        notificationTime: notificationTime.toTimeString().split(' ')[0]
      });

      if (notificationsEnabled) {
        await scheduleNotification(notificationTime);
      } else {
        await cancelAllNotifications();
      }

      Alert.alert('Enregistré', 'Les paramètres ont été enregistrés.');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des paramètres:', error);
      Alert.alert('Erreur', 'Erreur lors de l\'enregistrement des paramètres.');
    }
  };

  const toggleSwitch = (value) => {
    setNotificationsEnabled(value);
  };

  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || notificationTime;
    setNotificationTime(currentDate);
    setFormattedTime(formatTime(currentDate));
  };

  // Formater l'heure sélectionnée en HH:MM
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Paramètres de Notification</Text>
      <View style={styles.setting}>
        <Text style={styles.label}>Activer les notifications</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={notificationsEnabled}
        />
      </View>
      {notificationsEnabled && (
        <>
          <View style={styles.setting}>
            <Text style={styles.label}>Heure de notification</Text>
            <Text style={styles.timeText}>{formattedTime}</Text>
          </View>
          <DateTimePicker
            value={notificationTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        </>
      )}
      <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
        <Text style={styles.saveButtonText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
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
    color: '#1A1A1A',  
    marginBottom: 20,
    textAlign: 'center',
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    color: '#1A1A1A',  
  },
  timeText: {
    fontSize: 18,
    color: '#1A1A1A',  
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: '#00A8E8',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationSettings;
