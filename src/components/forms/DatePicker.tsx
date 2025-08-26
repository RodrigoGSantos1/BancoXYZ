import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { Calendar } from 'lucide-react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label: string;
  placeholder: string;
  minimumDate?: Date;
  maximumDate?: Date;
  error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder,
  minimumDate,
  maximumDate,
  error,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setIsVisible(Platform.OS === 'ios');
    if (event.type === 'set' && date) {
      setSelectedDate(date);
      onChange(date.toISOString().split('T')[0]);
    }
  };

  const showDatePicker = () => {
    setIsVisible(true);
  };

  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-semibold mb-2 text-base">
        {label}
      </Text>

      <TouchableOpacity
        className={`bg-gray-50 border rounded-xl p-4 flex-row items-center justify-between ${
          error ? 'border-red-500' : 'border-gray-200'
        }`}
        onPress={showDatePicker}
      >
        <Text className={selectedDate ? 'text-gray-800' : 'text-gray-400'}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </Text>
        <Calendar size={20} color="#6B7280" />
      </TouchableOpacity>

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}

      {isVisible &&
        (Platform.OS === 'ios' ? (
          <Modal visible transparent animationType="fade">
            <View className="flex-1 bg-black bg-opacity-50 justify-end">
              <View className="bg-white rounded-t-2xl">
                <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
                  <TouchableOpacity onPress={() => setIsVisible(false)}>
                    <Text className="text-primary-500 font-medium">
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                  <Text className="text-gray-800 font-semibold">
                    Selecionar Data
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedDate) {
                        onChange(selectedDate.toISOString().split('T')[0]);
                      }
                      setIsVisible(false);
                    }}
                  >
                    <Text className="text-primary-500 font-medium">
                      Confirmar
                    </Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={selectedDate || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  locale="pt-BR"
                />
              </View>
            </View>
          </Modal>
        ) : (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        ))}
    </View>
  );
};
