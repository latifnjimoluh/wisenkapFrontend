import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import NotificationManager from './NotificationManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationSettings = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const loadTime = async () => {
      const storedTime = await AsyncStorage.getItem('notificationTime');
      if (storedTime) {
        setTime(new Date(storedTime));
      }
    };
    loadTime();
  }, []);

  const scheduleDailyNotification = () => {
    const nextSchedule = new Date();
    nextSchedule.setDate(nextSchedule.getDate() + 1);
    nextSchedule.setHours(time.getHours());
    nextSchedule.setMinutes(time.getMinutes());

    NotificationManager.scheduleNotification(
      'daily-alerts',
      'Rappel quotidien',
      'Ceci est votre notification quotidienne',
      nextSchedule
    );
    Alert.alert('Notification', 'La notification a été programmée avec succès');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setTime(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choisissez l'heure de la notification :</Text>
      <DateTimePicker
        value={time}
        mode="time"
        display="default"
        onChange={onChange}
      />
      <Button title="Programmer Notification" onPress={scheduleDailyNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default NotificationSettings;
