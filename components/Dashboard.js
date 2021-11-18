import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "./Mainstyle.js";

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
      setTimeout(getData, 500);
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
        </>
      )}
    </View>
  );
}

export default Dashboard;
