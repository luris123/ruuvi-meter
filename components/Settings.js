import * as React from "react";
import { Text, View, Button, ImageBackground } from "react-native";
import styles from "./Mainstyle.js";

function SettingsScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/background.jpg")}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          onPress={() => navigation.goBack()}
          title="Go back to dashboard"
        />
      </View>
    </ImageBackground>
  );
}

export default SettingsScreen;
