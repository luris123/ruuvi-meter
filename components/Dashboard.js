import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "./Mainstyle.js";

const API_URL =
  "https://ruuvibase-default-rtdb.europe-west1.firebasedatabase.app/.json";

function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [tenMinuteData, setTenMinuteData] = useState([]);
  const [thirtyMinuteData, setThirtyMinuteData] = useState([]);

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
      setTenMinuteData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getThirtyMinuteData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setThirtyMinuteData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    getTenMinuteData();
    getThirtyMinuteData();

    setInterval(() => {
      getTenMinuteData();
    }, 10000 * 60);

    setInterval(() => {
      getThirtyMinuteData();
    }, 30000 * 60);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.text}>Real time data</Text>
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
          <Text style={styles.text}>
            Data that will update every 10 minutes
          </Text>
          <FlatList
            data={tenMinuteData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.title}>
                Temperature: {item.Temperature.toFixed(2) + "°C\n"}
                Humidity: {item.Humidity.toFixed(2) + "%\n"}
                RSSI: {item.RSSI}
              </Text>
            )}
          />
          <Text style={styles.text}>
            Data that will update every 30 minutes
          </Text>
          <FlatList
            data={thirtyMinuteData}
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
