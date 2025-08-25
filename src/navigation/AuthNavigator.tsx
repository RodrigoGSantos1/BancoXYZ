import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { lazyScreen } from '../utils/lazyLoad';

const Stack = createStackNavigator();

const LoginScreen = lazyScreen(() => import('../screens/auth/LoginScreen'));

export const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);
