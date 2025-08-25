import React, { Suspense } from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingScreen = () => (
  <View className="flex-1 items-center justify-center bg-gray-50">
    <ActivityIndicator size="large" color="#5B6BFF" />
  </View>
);

export const lazyScreen = (
  factory: () => Promise<{ default: React.ComponentType<any> }>
) => {
  const LazyComponent = React.lazy(factory);
  return (props: any) => (
    <Suspense fallback={<LoadingScreen />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
