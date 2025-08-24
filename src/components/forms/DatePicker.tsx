import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'lucide-react-native';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label: string;
  placeholder: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateSelect = (date: Date) => {
    onChange(formatDate(date));
    setIsVisible(false);
  };

  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-semibold mb-2 text-base">
        {label}
      </Text>

      <TouchableOpacity
        className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex-row items-center justify-between"
        onPress={() => setIsVisible(true)}
      >
        <Text className={value ? 'text-gray-800' : 'text-gray-400'}>
          {value || placeholder}
        </Text>
        <Calendar size={20} color="#6B7280" />
      </TouchableOpacity>

      <Modal visible={isVisible} transparent animationType="fade">
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-white rounded-2xl p-6 w-80">
            <Text className="text-xl font-bold text-center mb-4">
              Selecionar Data
            </Text>

            <TouchableOpacity
              className="bg-primary-500 rounded-xl p-4 mb-3"
              onPress={() => handleDateSelect(today)}
            >
              <Text className="text-white text-center font-semibold">Hoje</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-primary-500 rounded-xl p-4 mb-3"
              onPress={() => handleDateSelect(tomorrow)}
            >
              <Text className="text-white text-center font-semibold">
                Amanhã
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-200 rounded-xl p-4"
              onPress={() => setIsVisible(false)}
            >
              <Text className="text-gray-700 text-center font-semibold">
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
