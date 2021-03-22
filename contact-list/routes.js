import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import User from './screens/User';

// const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Contacts"
        component={Contacts}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        name="User"
        component={User}
      />
    </Tab.Navigator>
  );
}
