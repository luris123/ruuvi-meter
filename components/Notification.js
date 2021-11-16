import React, { useEffect, useState } from "react";
import { Keyboard, TextInput, Text, View, Button } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

function NotificationsScreen({ navigation }) {
  const [text, onChangeText] = useState("");
  const [desiredTemperature, setDesiredTemperature] = useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <>
        <Text>Give the temperature that will notify the user</Text>

        <TextInput
          style={{ fontSize: 30, borderWidth: 1, width: 300 }}
          placeholder="Temperature (°C)"
          onChangeText={(text) => onChangeText(text)}
          defaultValue={text}
          keyboardType="numeric"
        />
        <Button
          onPress={() => {
            setDesiredTemperature(text);
            navigation.goBack();
          }}
          title="Schedule and go back to dashboard"
        />
        <Text>{desiredTemperature}</Text>
      </>
    </View>
  );
}
export default NotificationsScreen;
