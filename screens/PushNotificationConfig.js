// File path: /path/to/PushNotificationConfig.js
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

// Configuration des notifications push
PushNotification.configure({
  onNotification: function (notification) {
    console.log('Notification reçue:', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});

// Créez le canal de notification (Android)
if (Platform.OS === 'android') {
  PushNotification.createChannel(
    {
      channelId: "alerts-channel",
      channelName: "Alerts Channel",
      channelDescription: "A channel to categorize your alert notifications",
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );
}

export default PushNotification;
