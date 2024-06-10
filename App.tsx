import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { registerPushToken, sendPushNotification } from './api';
import firebase from '@react-native-firebase/app';
import firebaseConfig from './firebase-config.json';
import PushNotification from 'react-native-push-notification';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Créer et configurer un canal de notification pour Android
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
  (created) => console.log(`Channel created '${created}'`)
);

const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const getToken = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const fcmToken = await messaging().getToken();
        setToken(fcmToken);
        if (fcmToken) {
          await registerPushToken(fcmToken);
        }
      }
    };

    // Gérer les notifications en premier plan
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Un nouveau message FCM est arrivé !', remoteMessage);
      PushNotification.localNotification({
        channelId: "default-channel-id",
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body,
        smallIcon: "ic_notification", // Icône pour les notifications
        largeIcon: "ic_launcher", // Icône large
      });
    });

    // Gérer les notifications en arrière-plan
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message géré en arrière-plan !', remoteMessage);
    });

    getToken();
    return () => {
      unsubscribeForeground();
    };
  }, []);

  const handleSendNotification = async () => {
    if (token) {
      await sendPushNotification(token, message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications Push</Text>
      <TextInput
        style={styles.input}
        placeholder="Message de notification"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Envoyer la Notification" onPress={handleSendNotification} />
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
