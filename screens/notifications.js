import notifee, { AndroidImportance, TriggerType, TimestampTrigger } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Demande de permissions pour les notifications
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

// Obtention du jeton FCM
export const getFCMToken = async () => {
  const token = await messaging().getToken();
  await AsyncStorage.setItem('fcmToken', token);
  console.log('FCM Token:', token);
  return token;
};

// Planification des notifications
export const scheduleNotification = async (date) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: getNextTriggerTime(date),
    repeatFrequency: undefined, // Ne pas répéter directement
  };

  await notifee.createTriggerNotification(
    {
      title: 'WISENKAP',
      body: 'C\'est l\'heure de remplir vos transactions !',
      android: {
        channelId,
      },
    },
    trigger
  );
};

// Annuler toutes les notifications
export const cancelAllNotifications = async () => {
  await notifee.cancelAllNotifications();
};

// Calcul de l'heure de la prochaine notification
const getNextTriggerTime = (date) => {
  const now = new Date();
  const triggerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), date.getHours(), date.getMinutes(), 0);

  // Si l'heure de déclenchement est dans le passé, planifier pour le lendemain
  if (triggerDate.getTime() <= now.getTime()) {
    triggerDate.setDate(triggerDate.getDate() + 1);
  }

  return triggerDate.getTime();
};
