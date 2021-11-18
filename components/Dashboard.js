import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "./Mainstyle.js";

const API_URL =
  "https://ruuvibase-default-rtdb.europe-west1.firebasedatabase.app/.json";

function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [tenMinutedata, setTenMinutedata] = useState([]);

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

  const getTenMinuteData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setTenMinutedata(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    setInterval(getTenMinuteData(), 600000);
    tenMinutes();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.title}>Real time data</Text>
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
          <Text style={styles.title}>Data from 10 minutes ago</Text>
          <FlatList
            data={tenMinutedata}
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
