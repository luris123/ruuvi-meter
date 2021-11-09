import * as React from "react";
import { Text, View } from "react-native";

const API_URL =
  "https://ruuvibase-default-rtdb.europe-west1.firebasedatabase.app/data/.json";

function Dashboard() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>DATA</Text>
    </View>
  );
}

export default Dashboard;
