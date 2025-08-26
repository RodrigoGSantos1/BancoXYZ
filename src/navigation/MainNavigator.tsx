import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Send, History, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

export const MainNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E7EB',
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#1F2937',
        },
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: Platform.select({ ios: 88, android: 60 }),
          paddingBottom: Platform.select({ ios: insets.bottom, android: 8 }),
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#5B6BFF',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'BancoXYZ',
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Transfers"
        component={TransfersScreen}
        options={{
          title: 'Transferências',
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <History size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Transfer"
        component={TransferScreen}
        options={{
          title: 'Nova transferência',
          tabBarLabel: 'Transferir',
          tabBarIcon: ({ color, size }) => <Send size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
