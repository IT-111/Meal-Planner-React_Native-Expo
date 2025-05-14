import * as Notifications from "expo-notifications";

// Request Notification Permissions
export const requestNotificationPermissions = async () => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("You need to grant permission for notifications to work.");
    }
    return status;
  } catch (err) {
    console.error("Error requesting notification permissions:", err);
    return "denied";
  }
};

// Get Push Token for the device (needed for push notifications)
export const getPushToken = async () => {
  const status = await requestNotificationPermissions();

  if (status === "granted") {
    try {
      const token = await Notifications.getExpoPushTokenAsync();
      console.log("Push token:", token.data); // For debugging, log the token
      return token.data;
    } catch (err) {
      console.error("Error getting push token:", err);
      return null;
    }
  } else {
    return null;
  }
};

// Schedule Notification after a certain time
export const scheduleNotification = async (timeInSeconds = 10) => {
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Meal Reminder",
        body: "Time for your scheduled meal!", // Customize message
        sound: true, // Enable sound
      },
      trigger: {
        seconds: timeInSeconds, // Trigger after the specified time
      },
    });
    console.log(`Notification scheduled with ID: ${id}`); // For debugging
    return id;
  } catch (err) {
    console.error("Error scheduling notification:", err); // Log any error
    return null;
  }
};

// Handle Notifications when received
export const handleNotificationReceived = () => {
  // Handle notifications while the app is in the foreground
  Notifications.addNotificationReceivedListener((notification) => {
    console.log("Notification received in foreground:", notification);
    // Optionally: Do something like updating UI or navigating to a specific screen
  });
};

// Set up background notification handler (optional, if needed for background notifications)
export const handleBackgroundNotification = () => {
  // Handle notifications when the app is in the background or closed
  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log("Notification responded in background:", response);
    // Optionally: Handle the action (e.g., navigate to a specific screen)
  });
};

// Unsubscribe from notification listeners when the component is unmounted (cleanup)
export const cleanupNotificationListeners = () => {
  const foregroundSubscription = Notifications.addNotificationReceivedListener((notification) => {});
  const backgroundSubscription = Notifications.addNotificationResponseReceivedListener((response) => {});

  // When the component unmounts or the listeners are no longer needed, clean them up
  return () => {
    foregroundSubscription.remove();
    backgroundSubscription.remove();
  };
};
