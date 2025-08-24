import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User, Settings } from 'lucide-react-native';
import { useAuthStore } from '../../store/auth/authStore';

export const UserInfo = () => {
  const { user } = useAuthStore();

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mr-3">
            <User size={24} color="#5B6BFF" />
          </View>
          <View>
            <Text className="text-gray-800 font-semibold text-lg">
              {user?.name}
            </Text>
            <Text className="text-gray-500 text-sm">{user?.email}</Text>
          </View>
        </View>

        <TouchableOpacity>
          <Settings size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
