import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Send, CreditCard, Download, QrCode } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  title,
  onPress,
  disabled = false,
}) => (
  <TouchableOpacity
    className={`flex-1 items-center py-4 ${
      disabled ? 'bg-gray-100' : 'bg-white'
    } rounded-xl shadow-sm active:bg-gray-50`}
    onPress={onPress}
    disabled={disabled}
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    style={Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    })}
  >
    {icon}
    <Text
      className={`text-sm mt-2 font-medium ${
        disabled ? 'text-gray-400' : 'text-gray-700'
      }`}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

export const QuickActions = () => {
  const navigation = useNavigation();

  return (
    <View className="bg-gray-50 rounded-2xl p-4">
      <Text className="text-gray-800 font-semibold text-lg mb-4">
        Ações rápidas
      </Text>

      <View className="flex-row space-x-3">
        <QuickAction
          icon={<Send size={24} color="#5B6BFF" />}
          title="Transferir"
          onPress={() => navigation.navigate('Transfer' as never)}
        />
        <QuickAction
          icon={<CreditCard size={24} color="#5B6BFF" />}
          title="Pagar"
          onPress={() => {}}
          disabled
        />
        <QuickAction
          icon={<Download size={24} color="#5B6BFF" />}
          title="Depositar"
          onPress={() => {}}
          disabled
        />
        <QuickAction
          icon={<QrCode size={24} color="#5B6BFF" />}
          title="PIX"
          onPress={() => {}}
          disabled
        />
      </View>
    </View>
  );
};
