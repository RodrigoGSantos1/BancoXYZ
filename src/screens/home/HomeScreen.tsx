import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { BalanceCard } from '../../components/home/BalanceCard';
import { QuickActions } from '../../components/home/QuickActions';
import { UserInfo } from '../../components/home/UserInfo';
// import { useAuthStore } from '../../store/auth/authStore';

export const HomeScreen = () => {
  // const { user } = useAuthStore();
  const [refreshing, setRefreshing] = React.useState(false);

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
      </View>
    </ScrollView>
  );
};
