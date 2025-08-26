import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RefreshCw, Eye, EyeOff } from 'lucide-react-native';
import { BalanceService } from '../../services/balance/balanceService';
import { useAuthContext } from '../../providers/AuthProvider';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  fetchBalanceSuccess,
  fetchBalanceStart,
  fetchBalanceFailure,
} from '../../store/slices/balanceSlice';
import { updateUserBalance } from '../../store/slices/authSlice';

export const BalanceCard = React.memo(() => {
  const { user, isAuthenticated } = useAuthContext();
  const dispatch = useAppDispatch();
  const { balance: reduxBalance, isLoading } = useAppSelector(
    (state) => state.balance
  );
  const [currency, setCurrency] = useState('BRL');
  const [showBalance, setShowBalance] = useState(true);

  const currentBalance = reduxBalance || user?.balance || 0;

  const fetchBalance = useCallback(async () => {
    if (!user || !isAuthenticated) {
      return;
    }

    dispatch(fetchBalanceStart());
    try {
      const response = await BalanceService.getBalance();
      dispatch(
        fetchBalanceSuccess({
          balance: response.accountBalance,
          accountNumber: user.accountNumber || '',
        })
      );

      if (user && response.accountBalance !== user.balance) {
        const diff = response.accountBalance - (user.balance || 0);
        dispatch(
          updateUserBalance({
            amount: Math.abs(diff),
            operation: diff >= 0 ? 'credit' : 'debit',
          })
        );
      }

      setCurrency(response.currency);
    } catch (error) {
      dispatch(fetchBalanceFailure('Erro ao buscar saldo'));
    }
  }, [user, isAuthenticated, dispatch]);

  const formattedBalance = useMemo(() => {
    return currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }, [currentBalance]);

  useEffect(() => {
    if (user && isAuthenticated) {
      dispatch(
        fetchBalanceSuccess({
          balance: user.balance || 0,
          accountNumber: user.accountNumber || '',
        })
      );

      const timer = setTimeout(fetchBalance, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, isAuthenticated, fetchBalance, dispatch]);

  if (!user || !isAuthenticated) {
    return null;
  }

  return (
    <View className="bg-white rounded-2xl p-6 shadow-lg mb-4">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <Text className="text-gray-600 text-base mr-2">Saldo disponível</Text>
          <TouchableOpacity
            onPress={() => setShowBalance(!showBalance)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            testID="toggle-balance-visibility"
          >
            {showBalance ? (
              <EyeOff size={16} color="#6B7280" />
            ) : (
              <Eye size={16} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={fetchBalance}
          disabled={isLoading}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          className={`${isLoading ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={20} color={isLoading ? '#9CA3AF' : '#6B7280'} />
        </TouchableOpacity>
      </View>

      <View className="bg-gray-50 rounded-xl p-4 mb-4">
        <Text className="text-3xl font-bold text-gray-800">
          {showBalance ? (
            <>
              {currency} {formattedBalance}
            </>
          ) : (
            '••••••'
          )}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-gray-500 text-sm">Conta</Text>
        <Text className="text-gray-700 font-medium">{user.accountNumber}</Text>
      </View>
    </View>
  );
});
