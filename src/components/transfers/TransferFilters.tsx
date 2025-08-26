import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Search, Filter } from 'lucide-react-native';

import { TransferFiltersProps } from '../../types';
import { MoneyInput } from '../forms/MoneyInput';
import { DatePicker } from '../forms/DatePicker';

export const TransferFilters: React.FC<TransferFiltersProps> = ({
  onSearch,
  onFilterByValue,
  onFilterByDate,
  onClearFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };

  const handleValueFilter = () => {
    const min = parseInt(minValue, 10) || 0;
    const max = parseInt(maxValue, 10) || Infinity;
    onFilterByValue(min / 100, max / 100);
  };

  const handleDateFilter = () => {
    onFilterByDate(startDate, endDate);
  };

  const handleClearFilters = () => {
    setMinValue('');
    setMaxValue('');
    setStartDate('');
    setEndDate('');
    setSearchQuery('');
    onClearFilters();
  };

  return (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
      <View className="flex-row items-center mb-4">
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 py-3 mr-3">
          <Search size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-3 text-gray-800 text-base py-0"
            placeholder="Buscar por destinatário..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity
          className="p-3 bg-primary-500 rounded-lg"
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color="white" />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View className="border-t border-gray-200 pt-4">
          <Text className="text-gray-700 font-semibold mb-3">
            Filtros Avançados
          </Text>

          <View className="flex-row space-x-3 mb-3">
            <View className="flex-1">
              <MoneyInput
                label="Valor Mínimo"
                value={parseInt(minValue) || 0}
                onValueChange={(value) => setMinValue(value.toString())}
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <MoneyInput
                label="Valor Máximo"
                value={parseInt(maxValue) || 0}
                onValueChange={(value) => setMaxValue(value.toString())}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View className="flex-row space-x-3 mb-4">
            <View className="flex-1">
              <DatePicker
                label="Data Início"
                placeholder="Selecione"
                value={startDate}
                onChange={setStartDate}
                maximumDate={endDate ? new Date(endDate) : undefined}
              />
            </View>
            <View className="flex-1">
              <DatePicker
                label="Data Fim"
                placeholder="Selecione"
                value={endDate}
                onChange={setEndDate}
                minimumDate={startDate ? new Date(startDate) : undefined}
              />
            </View>
          </View>

          <View className="flex-row space-x-3">
            <TouchableOpacity
              className="flex-1 bg-primary-500 rounded-lg py-2"
              onPress={() => {
                handleValueFilter();
                handleDateFilter();
              }}
            >
              <Text className="text-white text-center font-semibold">
                Filtrar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-gray-300 rounded-lg py-2"
              onPress={handleClearFilters}
            >
              <Text className="text-white text-center font-semibold">
                Limpar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
