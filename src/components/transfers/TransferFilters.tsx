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
    <View className="bg-white rounded-2xl p-5 mb-4 shadow">
      <View className="flex-row items-center mb-4">
        <View className="flex-1 flex-row items-center bg-white rounded-lg px-4 py-3 mr-3 border border-gray-200">
          <Search size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-3 text-gray-800 text-base py-0"
            placeholder="Buscar por destinatário..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => handleSearch('')} className="p-1">
              <Text className="text-gray-400">✕</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          className="w-11 h-11 items-center justify-center rounded-lg border border-gray-200 bg-primary-500"
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View className="border-t border-gray-100 pt-5">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-700 font-semibold text-lg">
              Filtros Avançados
            </Text>
            {(minValue !== '' ||
              maxValue !== '' ||
              startDate !== '' ||
              endDate !== '') && (
              <TouchableOpacity
                onPress={handleClearFilters}
                className="px-3 py-1 bg-primary-500 rounded-lg"
              >
                <Text className="text-white text-sm">Limpar Todos</Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="space-y-4">
            <Text className="text-gray-600 font-medium mb-1">
              Valor da Transferência
            </Text>
            <View className="flex-row space-x-3">
              <View className="flex-1">
                <MoneyInput
                  label="Mínimo"
                  value={parseInt(minValue, 10) || 0}
                  onValueChange={(value) => setMinValue(value.toString())}
                  keyboardType="numeric"
                />
              </View>
              <View className="flex-1">
                <MoneyInput
                  label="Máximo"
                  value={parseInt(maxValue, 10) || 0}
                  onValueChange={(value) => setMaxValue(value.toString())}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text className="text-gray-600 font-medium mb-1">Período</Text>
            <View className="flex-row space-x-3">
              <View className="flex-1">
                <DatePicker
                  label="Início"
                  placeholder="Selecione"
                  value={startDate}
                  onChange={setStartDate}
                  maximumDate={endDate ? new Date(endDate) : undefined}
                />
              </View>
              <View className="flex-1">
                <DatePicker
                  label="Fim"
                  placeholder="Selecione"
                  value={endDate}
                  onChange={setEndDate}
                  minimumDate={startDate ? new Date(startDate) : undefined}
                />
              </View>
            </View>

            <TouchableOpacity
              className={`mt-2 py-3.5 rounded-xl ${
                minValue !== '' ||
                maxValue !== '' ||
                startDate !== '' ||
                endDate !== ''
                  ? 'bg-primary-500'
                  : 'bg-gray-300'
              }`}
              onPress={() => {
                handleValueFilter();
                handleDateFilter();
              }}
              disabled={
                minValue === '' &&
                maxValue === '' &&
                startDate === '' &&
                endDate === ''
              }
            >
              <Text className="text-white text-center font-semibold">
                Aplicar Filtros
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
