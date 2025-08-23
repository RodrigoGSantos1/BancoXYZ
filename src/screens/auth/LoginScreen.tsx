import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useAuthStore } from '../../store/auth/authStore';
import { Eye, EyeOff, Fingerprint } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const LoginScreen = () => {
  const { login, isLoading, error } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <LinearGradient
        colors={['#5b6bff', '#2f2f85']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="h-80 rounded-b-[50px] relative overflow-hidden"
      >
        <View className="absolute inset-0 opacity-10">
          <View className="flex-row flex-wrap justify-center items-center h-full">
            {Array.from({ length: 50 }).map((_, i) => (
              <View
                key={i}
                className="w-2 h-2 bg-white rounded-full m-1 opacity-30"
              />
            ))}
          </View>
        </View>

        <View className="flex-1 justify-center items-center px-8">
          <Text className="text-white text-4xl font-bold mb-2">Login</Text>
          <Text className="text-white text-lg opacity-90">
            Please Login to continue
          </Text>
        </View>
      </LinearGradient>

      <View className="px-6 -mt-20">
        <View className="bg-white rounded-3xl shadow-lg p-8">
          {/* Email Field */}
          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2 text-base">
              Email Address
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
              placeholder="email@gmail.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2 text-base">
              Password
            </Text>
            <View className="relative">
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 pr-12 text-gray-800"
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye size={20} className="text-gray-500" />
                ) : (
                  <EyeOff size={20} className="text-gray-500" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row justify-between items-center mb-8">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                className={`w-5 h-5 rounded border-2 mr-2 items-center justify-center ${
                  rememberMe
                    ? 'bg-primary-500 border-primary-500'
                    : 'border-gray-300'
                }`}
              >
                {rememberMe && <Text className="text-white text-xs">✓</Text>}
              </View>
              <Text className="text-gray-600">Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text className="text-gray-600">Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-primary-500 rounded-xl p-4 mb-8"
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text className="text-white text-center font-bold text-lg">
              {isLoading ? 'Entrando...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity className="px-6 py-8 items-center">
        <Fingerprint size={60} className="text-primary-900 mb-3 fon" />
        <Text className="text-gray-600 text-center">Biometric Login</Text>
      </TouchableOpacity>

      {error && (
        <View className="mx-6 mb-4 bg-red-50 border border-red-200 rounded-xl p-4">
          <Text className="text-red-600 text-center">{error}</Text>
        </View>
      )}
    </ScrollView>
  );
};
