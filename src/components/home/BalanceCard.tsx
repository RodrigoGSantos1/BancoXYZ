import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import { BalanceService } from '../../services/balance/balanceService';
import { useAuthStore } from '../../store/auth/authStore';

export const BalanceCard = () => {
  const { user } = useAuthStore();
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState('BRL');
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalance = async () => {
    setIsLoading(true);
    try {
      const response = await BalanceService.getBalance();
      setBalance(response.accountBalance);
      setCurrency(response.currency);
    } catch (error) {
      console.error('Erro ao buscar saldo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <View className="bg-white rounded-2xl p-6 shadow-lg">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-gray-600 text-base">Saldo Disponível</Text>
        <TouchableOpacity onPress={fetchBalance} disabled={isLoading}>
          <RefreshCw
            size={20}
            color="#6B7280"
            className={isLoading ? 'animate-spin' : ''}
          />
        </TouchableOpacity>
      </View>

      <Text className="text-3xl font-bold text-gray-800 mb-2">
        {currency}{' '}
        {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </Text>

      <Text className="text-gray-500 text-sm">
        Conta: {user?.accountNumber}
      </Text>
    </View>
  );
};
