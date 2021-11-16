import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";

const API_URL =
  "https://ruuvibase-default-rtdb.europe-west1.firebasedatabase.app/.json";

function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    getData();
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
          <Text style={styles.title}>onko ttune</Text>
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
