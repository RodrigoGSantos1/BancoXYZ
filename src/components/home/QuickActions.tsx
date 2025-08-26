import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Send, CreditCard, Download, QrCode } from 'lucide-react-native';

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity
    className="flex-1 items-center py-4 bg-white rounded-xl shadow-sm"
    onPress={onPress}
  >
    {icon}
    <Text className="text-gray-700 text-sm mt-2 font-medium">{title}</Text>
  </TouchableOpacity>
);

export const QuickActions = () => {
  return (
    <View className="bg-gray-50 rounded-2xl p-4">
      <Text className="text-gray-800 font-semibold text-lg mb-4">
        Ações rápidas
      </Text>

      <View className="flex-row space-x-3">
        <QuickAction
          icon={<Send size={24} color="#5B6BFF" />}
          title="Transferir"
          onPress={() => {}}
        />
        <QuickAction
          icon={<CreditCard size={24} color="#5B6BFF" />}
          title="Pagar"
          onPress={() => {}}
        />
        <QuickAction
          icon={<Download size={24} color="#5B6BFF" />}
          title="Depositar"
          onPress={() => {}}
        />
        <QuickAction
          icon={<QrCode size={24} color="#5B6BFF" />}
          title="PIX"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};
