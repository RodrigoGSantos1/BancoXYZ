import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface MaskedInputProps
  extends Omit<TextInputProps, 'onChangeText' | 'value'> {
  label: string;
  mask: (value: string) => string;
  unmask: (value: string) => string | number;
  onValueChange: (value: string | number) => void;
  error?: string;
  placeholder?: string;
  value: string | number;
}

export const MaskedInput: React.FC<MaskedInputProps> = ({
  label,
  mask,
  unmask,
  onValueChange,
  error,
  placeholder,
  value,
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (value !== undefined && value !== null) {
      const maskedValue = mask(value.toString());
      setDisplayValue(maskedValue);
    }
  }, [value, mask]);

  const handleChangeText = (text: string) => {
    const numericText = text.replace(/\D/g, '');

    if (numericText === '') {
      setDisplayValue('');
      onValueChange(0);
      return;
    }

    setDisplayValue(numericText);
    const unmaskedValue = unmask(numericText);
    onValueChange(unmaskedValue);
  };

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
        value={displayValue}
        onChangeText={handleChangeText}
        {...props}
      />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};
