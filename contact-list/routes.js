import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import User from './screens/User';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='User'>
      <Stack.Screen
        name="Contacts"
        component={Contacts}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        name="User"
        component={User}
      />
    </Stack.Navigator>
  );
}
