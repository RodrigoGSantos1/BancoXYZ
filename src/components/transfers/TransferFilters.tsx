import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Search, Filter } from 'lucide-react-native';

interface TransferFiltersProps {
  onSearch: (query: string) => void;
  onFilterByValue: (minValue: number, maxValue: number) => void;
  onFilterByDate: (startDate: string, endDate: string) => void;
  onClearFilters: () => void;
}

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
    const min = parseFloat(minValue) || 0;
    const max = parseFloat(maxValue) || Infinity;
    onFilterByValue(min, max);
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
              <Text className="text-gray-600 text-sm mb-1">Valor Mínimo</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800"
                placeholder="0,00"
                value={minValue}
                onChangeText={setMinValue}
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <Text className="text-gray-600 text-sm mb-1">Valor Máximo</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800"
                placeholder="1000,00"
                value={maxValue}
                onChangeText={setMaxValue}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View className="flex-row space-x-3 mb-4">
            <View className="flex-1">
              <Text className="text-gray-600 text-sm mb-1">Data Início</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800"
                placeholder="2024-01-01"
                value={startDate}
                onChangeText={setStartDate}
              />
            </View>
            <View className="flex-1">
              <Text className="text-gray-600 text-sm mb-1">Data Fim</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800"
                placeholder="2024-12-31"
                value={endDate}
                onChangeText={setEndDate}
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
