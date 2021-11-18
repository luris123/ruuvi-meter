import React, { useEffect, useState } from "react";
import { Keyboard, TextInput, Text, View, Button } from "react-native";
import styles from "./Mainstyle.js";
import * as Notifications from "expo-notifications";

const onSubmit = (seconds) => {
  Keyboard.dismiss();
  const schedulingOptions = {
    content: {
      title: "Hello",
      body: "Reminder to check the temperature",
      sound: true,
      vibrate: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      color: "blue",
    },
    trigger: {
      seconds: seconds * 60,
    },
  };
  // Notifications show only when app is not active.
  // (ie. another app being used or device's screen is locked)
  Notifications.scheduleNotificationAsync(schedulingOptions);
};
const handleNotification = () => {
  console.warn("ok! got your notif");
};

function NotificationsScreen({ navigation }) {
  const [text, onChangeText] = useState("");

  useEffect(() => {
    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, []);

  return (
    <View style={styles.container}>
      <>
        <Text style={styles.title}>
          Input when the user should be reminded.
        </Text>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder="Minutes"
          style={{ fontSize: 30, borderWidth: 1, width: 300 }}
          keyboardType="numeric"
        />
        <Button
          onPress={() => {
            onSubmit(Number(text));
            navigation.goBack();
          }}
          title="Schedule and go back to dashboard"
        />
      </>
    </View>
  );
}
export default NotificationsScreen;
