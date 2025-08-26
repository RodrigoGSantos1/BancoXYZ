import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LogOut, User, CreditCard, Mail } from 'lucide-react-native';
import { useAuthContext } from '../../providers/AuthProvider';

const ProfileScreen = () => {
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-primary-100 rounded-full items-center justify-center mb-4">
            <User size={48} color="#5B6BFF" />
          </View>
          <Text className="text-2xl font-bold text-gray-800">{user?.name}</Text>
        </View>

        <View className="bg-white rounded-2xl p-6 shadow mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Dados da Conta
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-primary-50 rounded-full items-center justify-center mr-4">
                <CreditCard size={20} color="#5B6BFF" />
              </View>
              <View>
                <Text className="text-gray-500 text-sm">Conta</Text>
                <Text className="text-gray-800 font-medium">
                  {user?.accountNumber}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-primary-50 rounded-full items-center justify-center mr-4">
                <Mail size={20} color="#5B6BFF" />
              </View>
              <View>
                <Text className="text-gray-500 text-sm">Email</Text>
                <Text className="text-gray-800 font-medium">{user?.email}</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          className="bg-red-500 rounded-xl py-4 flex-row items-center justify-center"
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <LogOut size={20} color="white" />
          <Text className="text-white font-semibold text-base ml-2">
            Sair da conta
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
