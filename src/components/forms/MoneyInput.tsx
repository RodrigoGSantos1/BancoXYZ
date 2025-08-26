import React, { useState } from 'react';
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
  const [inputValue, setInputValue] = useState(formatMoney(value));

  function formatMoney(num: number): string {
    return (num / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function handleChangeText(text: string) {
    // Remove tudo que não é número
    const numbers = text.replace(/\D/g, '');

    // Converte para centavos
    const cents = numbers ? parseInt(numbers) : 0;

    // Atualiza o valor formatado
    setInputValue(formatMoney(cents));

    // Notifica o novo valor em centavos
    onValueChange(cents);
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
