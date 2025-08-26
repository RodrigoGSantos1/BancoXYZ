import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { ArrowRight, Calendar, User } from 'lucide-react-native';
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
        className={`bg-white rounded-2xl p-5 mb-3 ${
          Platform.OS === 'ios' ? 'shadow' : 'shadow-sm'
        }`}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View>
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center mr-3">
                <User size={20} color="#5B6BFF" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-gray-800 font-semibold text-base"
                  numberOfLines={1}
                >
                  {transfer.payeer.name}
                </Text>
                <Text className="text-gray-500 text-sm">
                  CPF: {transfer.payeer.document}
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="text-lg font-bold text-red-600 mb-1">
                -{formattedValue}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Calendar size={16} color="#6B7280" />
              <Text className="text-gray-600 text-sm ml-2">{formatDate}</Text>
            </View>
            <ArrowRight size={20} color="#6B7280" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);
