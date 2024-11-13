// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateTaskScreen from '../screens/CreateTask';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Make Task" component={CreateTaskScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />

      {/* Add other screens here as needed */}
    </Drawer.Navigator>
  );
}
