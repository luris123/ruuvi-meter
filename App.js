import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./components/Dashboard.js";
import NotificationsScreen from "./components/Notification.js";
import SettingsScreen from "./components/Settings.js";
import ProfileScreen from "./components/Profile.js";
import TestScreen from "./components/Test.js";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Test" component={TestScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
