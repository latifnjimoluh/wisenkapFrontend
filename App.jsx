// App.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: "default-channel-id",
    channelName: "Default Channel",
    channelDescription: "Un canal par défaut",
    playSound: true,
    soundName: "default",
    importance: 4,
    vibrate: true,
  },
  (created) => console.log(`Channel created: ${created}`)
);

const App = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState('');

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const scheduleNotification = () => {
    PushNotification.localNotificationSchedule({
      channelId: "default-channel-id",
      message,
      date,
      allowWhileIdle: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planifier Notifications</Text>
      <TextInput
        style={styles.input}
        placeholder="Message de notification"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Choisir l'heure" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Button title="Planifier la Notification" onPress={scheduleNotification} />
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
  title: {
    fontSize: 24,
    color: '#007bff',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#007bff',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default App;
