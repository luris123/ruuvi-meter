import * as React from "react";
import { Text, View, Button } from "react-native";

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.goBack()}
        title="Go back to dashboard"
      />
    </View>
  );
}

export default SettingsScreen;
