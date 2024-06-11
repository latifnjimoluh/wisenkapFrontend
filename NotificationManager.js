import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

class NotificationManager {
  configure = (onNotification) => {
    PushNotification.configure({
      onNotification: onNotification,
      requestPermissions: true,
    });
  };

  createChannel = (channelId) => {
    PushNotification.createChannel(
      {
        channelId: channelId,
        channelName: "Daily Alerts",
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  };

  scheduleNotification = async (channelId, title, message, time) => {
    const notificationId = 'dailyAlert';
    PushNotification.cancelLocalNotification(notificationId);

    PushNotification.localNotificationSchedule({
      channelId: channelId,
      title: title,
      message: message,
      date: time,
      repeatType: 'day',
      allowWhileIdle: true,
      id: notificationId,
    });

    await AsyncStorage.setItem('notificationTime', time.toString());
  };

  cancelAll = () => {
    PushNotification.cancelAllLocalNotifications();
  };
}

export default new NotificationManager();
