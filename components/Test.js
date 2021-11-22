import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import styles from "./Mainstyle.js";

function TestScreen({ navigation }) {
  const [minutes, setMinutes] = useState(10);

  const timer = () => {
    if (minutes > 0) {
      setTimeout(() => setMinutes(minutes - 1), 1000);
    } else {
      setMinutes("BOOOOM!");
    }
  };

  useEffect(() => {
    timer();
  });

  return (
    <View style={styles.container}>
      <>
        <Text style={styles.title}>Data will update in {minutes} minutes.</Text>
        <Button
          onPress={() => navigation.goBack()}
          title="Go back to dashboard"
        />
      </>
    </View>
  );
}

export default TestScreen;
