// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Drawer">
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
