import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface MoneyInputProps
  extends Omit<TextInputProps, 'onChangeText' | 'value'> {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  error?: string;
  placeholder?: string;
}

export const MoneyInput: React.FC<MoneyInputProps> = ({
  label,
  value,
  onValueChange,
  error,
  placeholder = '0,00',
  ...props
}) => {
  function formatMoney(num: number): string {
    return num.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const [inputValue, setInputValue] = useState(formatMoney(value));

  useEffect(() => {
    setInputValue(formatMoney(value));
  }, [value]);

  function handleChangeText(text: string) {
    const numbers = text.replace(/\D/g, '');

    const cents = numbers ? parseInt(numbers) : 0;
    const reais = cents / 100;

    setInputValue(formatMoney(reais));

    onValueChange(reais);
  }

  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-semibold mb-2 text-base">
        {label}
      </Text>
      <TextInput
        className={`bg-gray-50 border rounded-xl p-4 text-gray-800 ${
          error ? 'border-red-500' : 'border-gray-200'
        }`}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={inputValue}
        onChangeText={handleChangeText}
        keyboardType="numeric"
        {...props}
      />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};
