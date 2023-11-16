import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SearchScreen from '../screens/SearchScreen';
import {User} from '../types/user';
import * as Colors from '../constants/Colors';
import UserTabNavigator from './UserTabNavigator';

export type RootStackParamList = {
  Search: undefined;
  Profile: {user: User};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Search"
        screenOptions={{
          headerStyle: {backgroundColor: Colors.FT_SECONDARY},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{title: 'User Search'}}
        />
        <Stack.Screen
          name="Profile"
          component={UserTabNavigator}
          options={{title: 'Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
