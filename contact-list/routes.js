import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Favorites'>
      <Stack.Screen
        name="Contacts"
        component={Contacts}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
      />
    </Stack.Navigator>
  );
}
