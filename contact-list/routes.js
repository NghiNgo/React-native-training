import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import colors from './utils/colors';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Contacts'>
      <Stack.Screen
        name="Contacts"
        component={Contacts}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
}
