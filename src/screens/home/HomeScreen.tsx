import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { BalanceCard, QuickActions, UserInfo } from '../../components/index';

const HomeScreen = () => {
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

export default HomeScreen;
