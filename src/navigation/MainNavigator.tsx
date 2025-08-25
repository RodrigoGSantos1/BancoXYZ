import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { lazyScreen } from '../utils/lazyLoad';

const Tab = createBottomTabNavigator();

const HomeScreen = lazyScreen(() => import('../screens/home/HomeScreen'));
const TransfersScreen = lazyScreen(
  () => import('../screens/transfers/TransfersScreen')
);
const TransferScreen = lazyScreen(
  () => import('../screens/transfer/TransferScreen')
);
const ProfileScreen = lazyScreen(
  () => import('../screens/profile/ProfileScreen')
);

export const MainNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Transfers" component={TransfersScreen} />
    <Tab.Screen name="Transfer" component={TransferScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
