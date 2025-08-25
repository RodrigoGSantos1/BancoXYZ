import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowRight, TrendingDown } from 'lucide-react-native';
import { TransferItemProps } from '../../types';

export const TransferItem = React.memo(
  ({ transfer, onPress }: TransferItemProps) => {
    const formatDate = useMemo(() => {
      const date = new Date(transfer.date);
      return date.toLocaleDateString('pt-BR');
    }, [transfer.date]);

    const formattedValue = useMemo(() => {
      return transfer.value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: transfer.currency,
      });
    }, [transfer.value, transfer.currency]);

    return (
      <TouchableOpacity
        className="bg-white rounded-xl p-4 mb-3 shadow-sm"
        onPress={onPress}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-primary-100 rounded-full items-center justify-center mr-3">
                <TrendingDown size={16} color="#5B6BFF" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold text-base">
                  {transfer.payeer.name}
                </Text>
                <Text className="text-gray-500 text-sm">
                  CPF: {transfer.payeer.document}
                </Text>
              </View>
            </View>

            <Text className="text-gray-600 text-sm">Data: {formatDate}</Text>
          </View>

          <View className="items-end">
            <Text className="text-lg font-bold text-red-600">
              -{formattedValue}
            </Text>
            <ArrowRight size={20} color="#6B7280" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);
