import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Keyboard,
  TextInput,
  Button,
} from "react-native";

const API_URL =
  "https://ruuvibase-default-rtdb.europe-west1.firebasedatabase.app/.json";

function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, onChangeText] = useState("");

  const getData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setData(json);
      repeat = setTimeout(getData, 500);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
    getData();
    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.title}>
                Temperature: {item.Temperature.toFixed(2) + "°C\n"}
                Humidity: {item.Humidity.toFixed(2) + "%\n"}
                RSSI: {item.RSSI}
              </Text>
            )}
          />
          <TextInput
            onChangeText={onChangeText}
            value={text}
            placeholder="Seconds"
            style={{ fontSize: 30, borderWidth: 1, width: 300 }}
            keyboardType="numeric"
          />
          <Button onPress={() => onSubmit(Number(text))} title="Schedule" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#eaeaea",
  },
  title: {
    marginTop: 16,
    paddingVertical: 10,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Dashboard;
