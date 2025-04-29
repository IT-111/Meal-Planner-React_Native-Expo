import * as Notifications from 'expo-notifications';

export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status;
};

export const getPushToken = async () => {
  const status = await requestNotificationPermissions();
  
  if (status === 'granted') {
    const token = await Notifications.getExpoPushTokenAsync();
    console.log('Push token:', token.data);
    return token.data;
  } else {
    alert('Notification permissions not granted');
    return null;
  }
};

export const scheduleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Meal Reminder",
      body: "Time for your scheduled meal!",
    },
    trigger: {
      seconds: 10,  // Trigger notification after 10 seconds
    },
  });
};

export const handleNotificationReceived = () => {
  Notifications.addNotificationReceivedListener((notification) => {
    console.log('Notification received:', notification);
  });
};
