import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 bg-red-500 items-center justify-center">
      <Text className="text-white text-xl font-bold">BancoXYZ</Text>
      <StatusBar style="light" />
    </View>
  );
}
