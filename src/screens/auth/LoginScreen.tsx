import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/auth/authStore';
import { Eye, EyeOff, Fingerprint } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(4, 'Senha deve ter pelo menos 4 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginScreen = () => {
  const { login, isLoading, error, clearError } = useAuthStore();
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      await login(data.email, data.password);
    } catch (loginError) {
      console.error('Login error:', error);
    }
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
          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2 text-base">
              Email Address
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-gray-50 border rounded-xl p-4 text-gray-800 ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="email@gmail.com"
                  placeholderTextColor="#9CA3AF"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2 text-base">
              Password
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="relative">
                  <TextInput
                    className={`bg-gray-50 border rounded-xl p-4 pr-12 text-gray-800 ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    className="absolute right-4 top-4"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye size={20} color="#6B7280" />
                    ) : (
                      <EyeOff size={20} color="#6B7280" />
                    )}
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </Text>
            )}
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
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Text className="text-white text-center font-bold text-lg">
              {isLoading ? 'Entrando...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-6 py-8 items-center">
        <TouchableOpacity className="w-16 h-16 bg-primary-900 rounded-full items-center justify-center mb-3">
          <Fingerprint size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-gray-600 text-center">Biometric Login</Text>
      </View>

      {error && (
        <View className="mx-6 mb-4 bg-red-50 border border-red-200 rounded-xl p-4">
          <Text className="text-red-600 text-center">{error}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default LoginScreen;
