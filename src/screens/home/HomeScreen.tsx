import React from 'react';
import { View, ScrollView, RefreshControl, Button } from 'react-native';
import { BalanceCard } from '../../components/home/BalanceCard';
import { QuickActions } from '../../components/home/QuickActions';
import { UserInfo } from '../../components/home/UserInfo';
import { useAuth } from '../../hooks';

export const HomeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { logout } = useAuth();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-4">
        <UserInfo />
        <BalanceCard />
        <QuickActions />
        <Button title="Logout" onPress={logout} />
      </View>
    </ScrollView>
  );
};
