import React, { useEffect, useState } from "react";
import { Keyboard, TextInput, Text, View, Button } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

function NotificationsScreen({ navigation }) {
  const [text, onChangeText] = useState("");

  const onSubmit = (seconds) => {
    Keyboard.dismiss();
    const schedulingOptions = {
      content: {
        title: "This is a notification",
        body: "This is the body",
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: "blue",
      },
      trigger: {
        seconds: seconds,
      },
    };
    // Notifications show only when app is not active.
    // (ie. another app being used or device's screen is locked)
    Notifications.scheduleNotificationAsync(schedulingOptions);
  };
  const handleNotification = () => {
    console.warn("ok! got your notif");
  };

  useEffect(() => {
    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <>
        <Text>Give the temperature that will notify the user</Text>

        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder="Temperature"
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
